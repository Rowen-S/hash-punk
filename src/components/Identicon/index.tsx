import { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import Jazzicon from '@metamask/jazzicon'

const StyledIdenticonContainer = styled.div<{ size: number }>`
  height: ${({ size }) => size / 16}rem;
  width: ${({ size }) => size / 16}rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg4};
  & > div {
    display: flex !important;
  }
`

export default function Identicon({ size = 16 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(size, parseInt(account.slice(2, 10), 16)))
    }
  }, [account, size])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer size={size} ref={ref as any} />
}
export function AddressIdenticon({ size = 16, account }: { size?: number; account: string }) {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(size, parseInt(account.slice(2, 10), 16)))
    }
  }, [account, size])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer size={size} ref={ref as any} />
}
