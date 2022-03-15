import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useActiveWeb3React } from 'hooks/web3'
import { darken } from 'polished'
import { Activity } from 'react-feather'
import { Trans } from '@lingui/macro'
import styled, { css } from 'styled-components/macro'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import { injected, walletconnect, walletlink } from '../../connectors'
import { NetworkContextName } from '../../constants/misc'
import { useWalletModalToggle } from '../../state/application/hooks'

import { defaultChainId } from 'constants/chains'
// randomNumber
import { shortenAddress } from '../../utils'
import { switchToNetwork } from 'utils/switchToNetwork'

import { ButtonSecondary } from '../Button'
import Identicon from '../Identicon'
import WalletModal from '../WalletModal'

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean; error?: boolean }>`
  background-color: ${({ theme, error }) => (error ? theme.error : theme.bg6)};
  border: none;
  border-radius: 6px;

  color: ${({ theme }) => theme.black};
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.black};
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.black};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.bg6};
      color: ${({ theme }) => theme.black};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
        color: ${({ theme }) => darken(0.05, theme.black)};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg1)};
  padding: 1rem;
  font-family: Nippo-Bold;
  color: ${({ pending, theme }) => (pending ? theme.white : theme.black)};
  font-weight: 500;
  margin-right: 2px;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.bg3)};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg2))};
    }
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={'WalletConnect'} />
      </IconWrapper>
    )
  } else if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} alt={'CoinbaseWallet'} />
      </IconWrapper>
    )
  }
  return null
}

function Web3StatusInner() {
  const { account, chainId, connector, library, error } = useActiveWeb3React()
  const showSwitchAMainnet = Boolean(chainId !== defaultChainId)

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    if (showSwitchAMainnet) {
      return (
        <Web3StatusConnect
          error={true}
          id="web3-status-switch"
          onClick={() => {
            if (!library?.provider?.request || !chainId || !library?.provider?.isMetaMask) {
              return
            }
            switchToNetwork({ library, chainId: defaultChainId })
          }}
        >
          Switch to Mainnet
        </Web3StatusConnect>
      )
    }
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal}>
        <Text>{shortenAddress(account, 5)}</Text>
        {connector && <StatusIcon connector={connector} />}
      </Web3StatusConnected>
    )
  } else if (error) {
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>{error instanceof UnsupportedChainIdError ? <Trans>Wrong Network</Trans> : <Trans>Error</Trans>}</Text>
      </Web3StatusError>
    )
  } else {
    return (
      <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Text>
          <Trans>Connect wallet</Trans>
        </Text>
      </Web3StatusConnect>
    )
  }
}

export default function Web3Status() {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal />
    </>
  )
}