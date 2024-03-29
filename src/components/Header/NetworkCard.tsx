import { YellowCard } from 'components/Card'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useActiveWeb3React } from 'hooks/web3'
import { useEffect, useRef, useState } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useToggleModal } from 'state/application/hooks'
import styled, { css } from 'styled-components/macro'
import { switchToNetwork } from 'utils/switchToNetwork'
import { defaultChainId, getChainInfoOrDefault } from '../../constants/chains'

const BaseWrapper = css`
  position: relative;
  margin-right: 8px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: end;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0 0.5rem 0 0;
    width: initial;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`
// const BaseMenuItem = css`
//   align-items: center;
//   background-color: transparent;
//   border-radius: 12px;
//   color: ${({ theme }) => theme.text2};
//   cursor: pointer;
//   display: flex;
//   flex: 1;
//   flex-direction: row;
//   font-size: 16px;
//   font-weight: 400;
//   justify-content: space-between;
//   :hover {
//     color: ${({ theme }) => theme.text1};
//     text-decoration: none;
//   }
// `
const FallbackWrapper = styled(YellowCard)`
  ${BaseWrapper}
  width: auto;
  border-radius: 12px;
  padding: 8px 12px;
  width: 100%;
  user-select: none;
`

export default function NetworkCard() {
  const { chainId, library } = useActiveWeb3React()
  const node = useRef<HTMLDivElement>(null)
  const open = useModalOpen(ApplicationModal.ARBITRUM_OPTIONS)
  const toggle = useToggleModal(ApplicationModal.ARBITRUM_OPTIONS)
  useOnClickOutside(node, open ? toggle : undefined)

  const [, setImplements3085] = useState(false)
  useEffect(() => {
    // metamask is currently the only known implementer of this EIP
    // here we proceed w/ a noop feature check to ensure the user's version of metamask supports network switching
    // if not, we hide the UI
    if (!library?.provider?.request || !chainId || !library?.provider?.isMetaMask) {
      return
    }
    switchToNetwork({ library, chainId })
      .then((x) => x ?? setImplements3085(true))
      .catch(() => setImplements3085(false))
  }, [library, chainId])

  const info = getChainInfoOrDefault(chainId)
  if (!chainId || chainId === defaultChainId || !info || !library) {
    return null
  }
  return <FallbackWrapper title={info.label}>{info.label}</FallbackWrapper>
}
