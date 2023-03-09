import { useHashPunkContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import styled from 'styled-components/macro'
import Nft from 'assets/svg/nft-placeholder.svg'

const MineImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  border: 2px solid #000000;
  margin-bottom: 16px;
`
export function TokenImg({ tokenId }: { tokenId: number }) {
  const hPunkContract = useHashPunkContract()
  const tokenURI = useSingleCallResult(hPunkContract, 'tokenURI', [tokenId])?.result?.[0]
  return <MineImg src={tokenURI ?? Nft} />
}
