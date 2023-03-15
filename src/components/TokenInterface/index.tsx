import { useHashPunkContract } from 'hooks/useContract'
import { useSingleContractMultipleData } from 'state/multicall/hooks'
import styled from 'styled-components/macro'
import uriToHttp from 'utils/uriToHttp'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { get } from 'utils/request'
import { TokenIpfsJson } from 'queries/types'
import Card from 'components/Card'
import { TYPE } from 'theme'

import { Check } from 'react-feather'
import { RowBetween } from 'components/Row'

const VerticalCard = styled(Card)`
  flex: 0 0 25%;
  max-width: 25%;
  padding-left: 8px;
  padding-right: 8px;
`

const MineImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 24px;
  border: 2px solid #000000;
  margin-bottom: 16px;
`

export function CollectionImage({ tokenIds }: { tokenIds: number[] }) {
  const hPunkContract = useHashPunkContract()
  const [nftList, setNftList] = useState<TokenIpfsJson[]>()

  const tokenURIs = useSingleContractMultipleData(
    hPunkContract,
    'tokenURI',
    tokenIds.map((id) => [id])
  )

  const isValid = useMemo(() => tokenURIs.some(({ valid }) => valid), [tokenURIs])
  const isResult = useMemo(() => tokenURIs.some(({ result }) => result), [tokenURIs])

  const tokenURIsData = useMemo(
    () => isValid && isResult && tokenURIs.map(({ result }) => result?.[0]),
    [tokenURIs, isValid, isResult]
  )

  const feach = useMemo(() => {
    if (tokenURIsData && tokenURIsData.length > 0) return true
    return false
  }, [tokenURIsData])

  useEffect(() => {
    if (tokenURIsData && tokenURIsData.length > 0) {
      const list: any[] = []
      tokenURIsData.map((t) => {
        list.push(get(t.includes('ipfs://') ? uriToHttp(t)[0] : t))
      })
      Promise.all(list).then((item) => {
        setNftList(item)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feach])

  return (
    <>
      {nftList?.map(({ name, image, edition }) => (
        <VerticalCard key={name}>
          <MineImg src={image.includes('ipfs://') ? uriToHttp(image)[0] : image} />
          <TYPE.body color={'blue4'} textAlign="center">
            #{edition}
          </TYPE.body>
        </VerticalCard>
      ))}
    </>
  )
}
const RowMargin = styled(RowBetween)`
  margin: 24px 0;
`
const RareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
`
const RareTag = styled.div`
  width: 42px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: linear-gradient(90deg, #ff26b3 0%, #ffb38b 100%);
  border-radius: 4px;
  font-size: 14px;
  font-family: AppleSystemUIFont;
  color: #ffffff;
`

const Circle = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2a2a2a;
`
const ActiveCircle = styled(Circle)`
  background-color: #3500fe;
  border-color: #3500fe;
`

export function SelectImgOpton({
  tokenIds,
  tid,
  toggle,
}: {
  tokenIds: number[]
  tid: number
  toggle: Dispatch<SetStateAction<number>>
}) {
  const hPunkContract = useHashPunkContract()
  const [nftList, setNftList] = useState<TokenIpfsJson[]>()

  const tokenURIs = useSingleContractMultipleData(
    hPunkContract,
    'tokenURI',
    tokenIds.map((id) => [id])
  )

  const isValid = useMemo(() => tokenURIs.some(({ valid }) => valid), [tokenURIs])
  const isResult = useMemo(() => tokenURIs.some(({ result }) => result), [tokenURIs])

  const tokenURIsData = useMemo(
    () => isValid && isResult && tokenURIs.map(({ result }) => result?.[0]),
    [tokenURIs, isValid, isResult]
  )

  useEffect(() => {
    if (tokenURIsData && tokenURIsData.length > 0) {
      const list: any[] = []
      tokenURIsData.map((t) => {
        list.push(get(t.includes('ipfs://') ? uriToHttp(t)[0] : t))
      })
      Promise.all(list).then((item) => {
        setNftList(item)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenURIsData])

  return (
    <>
      {nftList?.map(({ name, image, edition }) => (
        <RowMargin key={name} onClick={() => toggle(edition)}>
          <RareBox>
            <img
              style={{ borderRadius: '8px' }}
              height={70}
              width={70}
              src={image.includes('ipfs://') ? uriToHttp(image)[0] : image}
            />
            <TYPE.body color={'blue4'} textAlign="center" margin="0 16px">
              #{edition}
            </TYPE.body>
            <RareTag>稀有</RareTag>
          </RareBox>
          {tid == edition ? (
            <ActiveCircle>
              <Check size={13} stroke={'white'} />
            </ActiveCircle>
          ) : (
            <Circle />
          )}
        </RowMargin>
      ))}
    </>
  )
}
