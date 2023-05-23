import Row from 'components/Row'
import styled from 'styled-components/macro'
import NoneImg from 'assets/images/noneImg.png'
import { useHashPunkContract, useHVlaueContract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'
import { CollectionImage } from 'components/TokenInterface'
import { CustomLightSpinner, TYPE } from 'theme'
import Circle from 'assets/images/blue-loader.svg'

import Hvalue from 'assets/images/hvalue.png'
import Card from 'components/Card'
import { AutoColumn } from 'components/Column'

const VerticalRow = styled(Row)`
  flex-flow: row wrap;
  margin-left: -8px;
  margin-right: -8px;
  row-gap: 24px;
`

const Nothing = styled.img`
  display: block;
  margin: auto;
`
const DataLoader = styled.div`
  display: block;
  width: 90px;
  height: 90px;
  margin: auto;
`

const VerticalCard = styled(Card)`
  flex: 0 0 25%;
  max-width: 25%;
  padding-left: 8px;
  padding-right: 8px;
`
export default function Mine() {
  const { account } = useActiveWeb3React()
  const hPunkContract = useHashPunkContract()
  const hValueContract = useHVlaueContract()

  const maxSupply = useSingleCallResult(hPunkContract, 'maxSupply')?.result?.[0]

  const callOwner = useSingleContractMultipleData(
    hPunkContract,
    'ownerOf',
    [...new Array(Number(maxSupply ?? 0)).keys()].map((index) => [index])
  )

  // const isError = useMemo(() => callOwner.some(({ error }) => error), [callOwner])
  const isLoading = useMemo(() => callOwner.some(({ loading }) => loading), [callOwner])
  // const IsSyncing = useMemo(() => callOwner.some(({ syncing }) => syncing), [callOwner])
  const isValid = useMemo(() => callOwner.some(({ valid }) => valid), [callOwner])

  const callOwnerData = useMemo(
    () => callOwner.map(({ result }, index) => (result?.[0] === account ? index : 0)).filter((x) => x),
    [callOwner, account]
  )

  //  LuckyPass

  const luckyPassBal = useSingleCallResult(hValueContract, 'balanceOf', [account ?? '', 1])?.result?.[0]

  const hVBal = useSingleCallResult(hValueContract, 'balanceOf', [account ?? '', 2])?.result?.[0]

  if (isLoading) {
    return (
      <DataLoader>
        <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
      </DataLoader>
    )
  }

  return (
    <>
      {Number(luckyPassBal) && Number(luckyPassBal) > 0 ? (
        <>
          <TYPE.mediumHeader>LuckyPass</TYPE.mediumHeader>
          <VerticalCard>
            <AutoColumn gap="sm">
              <img src={'/preview/luckyPass.gif'} width="100%" height={'auto'} />
              <TYPE.largeHeader textAlign={'center'}>X {Number(luckyPassBal)}</TYPE.largeHeader>
            </AutoColumn>
          </VerticalCard>
        </>
      ) : null}

      {Number(hVBal) && Number(hVBal) > 0 ? (
        <>
          <TYPE.mediumHeader>H Value</TYPE.mediumHeader>
          <VerticalRow>
            <VerticalCard>
              <AutoColumn gap="sm">
                <img src={Hvalue} width="100%" height={'auto'} />
                <TYPE.largeHeader textAlign={'center'}>X{Number(hVBal)}</TYPE.largeHeader>
              </AutoColumn>
            </VerticalCard>
          </VerticalRow>
        </>
      ) : null}

      {isValid ? (
        callOwnerData.length > 0 ? (
          <>
            <TYPE.mediumHeader>Hash Punk</TYPE.mediumHeader>
            <VerticalRow>
              <CollectionImage tokenIds={callOwnerData} />
            </VerticalRow>
          </>
        ) : (
          <Nothing src={NoneImg} />
        )
      ) : null}
    </>
  )
}
