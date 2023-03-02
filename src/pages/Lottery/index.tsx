import { ButtonPrimary } from 'components/Button'
import { DarkCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'

import { ReactComponent as Logo } from '../../assets/svg/logo.svg'
import { ReactComponent as Cat } from '../../assets/svg/cat.svg'
import Light from 'assets/images/light.png'

import Person from '../../assets/images/person.png'
// import PersonOne from '../../assets/images/person1.png'
// import PersonTwo from '../../assets/images/person2.png'
import { AbsImg, Line } from 'pages/styled'
import { useHashPunkContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useCallback, useState } from 'react'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { useTransactionAdder } from 'state/transactions/hooks'

const LotteryWrapper = styled.div`
  position: relative;
  padding: 120px 0px 0px 16px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 20px 0px 0px 0px;
  `};
`

const MintBodyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 240px;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    padding-right: 140px;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding-right: 120px;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-right: 0px;
    flex-direction: column;
    padding: 0px 16px;
  `};
`

const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 70px;
  background: url(${Light}) no-repeat;
  background-position: top;
  background-size: 100% 50%;
`

const MintWrapper = styled(AutoColumn)`
  max-width: 360px;
  margin-left: 120px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0px;
    width: 100%;
    max-width: unset;
  `};
`

const DarkLine = styled(Line)`
  margin-top: 137px !important;
  height: 1px;
  background-color: ${({ theme }) => theme.black};
`
const CatWrapper = styled.div`
  padding: 29px 60px;
  display: flex;
  justify-content: end;
`
export default function Lottery() {
  const punkContract = useHashPunkContract()
  const addTransaction = useTransactionAdder()

  const [{ minting, minthash, mintErrorMessage }, setModal] = useState<{
    minting: boolean
    minthash: string | undefined
    mintErrorMessage: string | undefined
  }>({
    minting: false,
    minthash: undefined,
    mintErrorMessage: undefined,
  })

  const totalSupply = useSingleCallResult(punkContract, 'totalSupply')?.result?.[0]
  const maxSupply = useSingleCallResult(punkContract, 'maxSupply')?.result?.[0]

  const handleDismissSubmissionModal = useCallback(() => {
    setModal({
      minting: false,
      minthash: undefined,
      mintErrorMessage: undefined,
    })
  }, [setModal])

  const exchangeNFT = useCallback(() => {
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })
    punkContract
      ?.mint(2, 1)
      .then((res) => {
        addTransaction(res)
        // res.wait().finally(() => setProcessing(false))
        setModal({
          minting: true,
          minthash: res.hash,
          mintErrorMessage,
        })
      })
      .catch((err) => {
        setModal({
          minting: true,
          minthash,
          mintErrorMessage: err.message,
        })
      })
  }, [mintErrorMessage, minthash, punkContract, addTransaction])

  return (
    <LotteryWrapper>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        toLink="/lottery"
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <MintBodyWrapper>
        <AbsImg src={Person} height="40%" left="0" bottom="0" zIndex={-1} />

        <LogoWrapper>
          <Logo viewBox="0 0 190 40" width="100%" height="240px" title="logo" />
        </LogoWrapper>

        <MintWrapper gap="40px">
          <TYPE.subHeader fontWeight={'bold'}>
            3,000 unique collectible characters with proof of ownership stored on the Matic blockchain. Each one is
            unique, and each one of them can be officially owned by a single person on the Matic blockchain.
          </TYPE.subHeader>
          <DarkCard width="100%" height="360px" />
          <RowBetween marginTop={'24px'}>
            <TYPE.black>TOTAL DRAW</TYPE.black>
            <TYPE.black>
              {totalSupply ? Number(totalSupply) : '-'}/{maxSupply ? Number(maxSupply) : '-'}
            </TYPE.black>
          </RowBetween>
          <ButtonPrimary $borderRadius="8px" onClick={exchangeNFT}>
            Draw
          </ButtonPrimary>
        </MintWrapper>
      </MintBodyWrapper>
      <DarkLine />
      <CatWrapper>
        <Cat width="48" height="46" />
      </CatWrapper>
    </LotteryWrapper>
  )
}
