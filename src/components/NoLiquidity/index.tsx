import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { ButtonPrimary } from 'components/Button'
import { ReactElement, useContext } from 'react'
import { Inbox } from 'react-feather'
import { useWalletModalToggle } from 'state/application/hooks'
import styled, { ThemeContext } from 'styled-components/macro'
import { TYPE } from 'theme'

const NoLiquidity = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`

export default function NotDataWrapper({ text }: { text: ReactElement }) {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const toggleWalletModal = useWalletModalToggle()
  const showConnectAWallet = Boolean(!account)
  return (
    <NoLiquidity>
      <TYPE.body color={theme.text3} textAlign="center">
        <Inbox size={48} strokeWidth={1} style={{ marginBottom: '.5rem' }} />
        <div>{text}</div>
      </TYPE.body>
      {showConnectAWallet && (
        <ButtonPrimary style={{ marginTop: '2em', padding: '8px 16px' }} onClick={toggleWalletModal}>
          <Trans>Connect a wallet</Trans>
        </ButtonPrimary>
      )}
    </NoLiquidity>
  )
}
