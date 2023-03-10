import { useHashPunkContract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import styled from 'styled-components/macro'
import Nft from 'assets/svg/nft-placeholder.svg'
import uriToHttp from 'utils/uriToHttp'
import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { fetchIpfsJson } from 'queries/token/fetchIpfsJson'
import { get } from 'utils/request'
import { TokenIpfsJson } from 'queries/types'
import Card from 'components/Card'
import { TYPE } from 'theme'

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

export function TokenImg({ tokenId }: { tokenId: number }) {
  const hPunkContract = useHashPunkContract()
  const tokenURI = useSingleCallResult(hPunkContract, 'tokenURI', [tokenId])?.result?.[0]

  let content
  if (tokenURI) {
    content = <IpfsImg tokenUrl={tokenURI} />
  } else {
    content = <></>
  }
  return <>{content}</>
}

function IpfsImg({ tokenUrl }: { tokenUrl: string }) {
  const { data: jsonResults, isLoading: jsonLoading } = useQuery('ipfsJson', () =>
    fetchIpfsJson({ jsonUri: tokenUrl.includes('ipfs://') ? uriToHttp(tokenUrl)[0] : tokenUrl })
  )

  const imageUri = useMemo(() => {
    if (jsonResults) {
      return jsonResults.image
    }
    return ''
  }, [jsonResults])

  if (jsonLoading) {
    return <MineImg src={Nft} />
  }

  return <MineImg src={imageUri.includes('ipfs://') ? uriToHttp(imageUri)[0] : imageUri} />
}
