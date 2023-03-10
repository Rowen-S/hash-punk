import Row from 'components/Row'
import styled from 'styled-components/macro'
import NoneImg from 'assets/images/noneImg.png'
import { useHashPunkContract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'
import { CollectionImage } from 'components/TokenInterface'
import { CustomLightSpinner } from 'theme'
import Circle from '../../assets/images/blue-loader.svg'

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
export default function Mine() {
  const { account } = useActiveWeb3React()
  const hPunkContract = useHashPunkContract()

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

  if (isLoading) {
    return (
      <DataLoader>
        <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
      </DataLoader>
    )
  }

  return (
    <>
      {isValid ? (
        callOwnerData.length > 0 ? (
          <VerticalRow>
            <CollectionImage tokenIds={callOwnerData} />
          </VerticalRow>
        ) : (
          <Nothing src={NoneImg} />
        )
      ) : null}
    </>
  )
}
