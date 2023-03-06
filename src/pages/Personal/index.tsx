import Row, { RowBetween } from 'components/Row'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Card from 'components/Card'
import { AutoColumn } from 'components/Column'
import { ButtonOutlined } from 'components/Button'

import { useHVlaueContract } from 'hooks/useContract'

// import { AbsImg } from 'pages/styled'

import Person from 'assets/images/person@2x.png'
import Vouchers from 'assets/svg/vouchers.png'
import UsedVouchers from 'assets/svg/usedVouchers.png'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useActiveWeb3React } from 'hooks/web3'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCallback, useState } from 'react'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'

const PersonalWrapper = styled(AutoColumn)`
  max-width: 1200px;
  padding: 120px 0px 0px 16px;
  width: 100%;
  height: 100%;
`
const BenefitCenter = styled(RowBetween)`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.black};
`

const BenefitImg = styled.img`
  width: 408px;
  height: 192px;
  right: 46px;
`

const HolidayCard = styled(Card)`
  ${({ theme }) => theme.flexRowNoWrap};
  background-color: ${({ theme }) => theme.blue3};
  border: 2px solid ${({ theme }) => theme.black};
  border-radius: 8px;
`
const HolidayCardGary = styled(HolidayCard)`
  background-color: #888888;
`

const HolidayDescWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
`

const ExchangeButton = styled(ButtonOutlined)`
  width: 125px;
  border: 2px solid ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  border-radius: 8px;
  & > button {
    float: right;
  }
  &:disabled {
    opacity: 100%;
    background-color: #f2f2f2;
  }
`
const ExchangeButtonGary = styled(ExchangeButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.white};
  pointer-events: none;
`

export default function Personal() {
  const { account } = useActiveWeb3React()
  const hValueContract = useHVlaueContract()

  const addTransaction = useTransactionAdder()

  const balanceOf = useSingleCallResult(hValueContract, 'balanceOf', [account ?? undefined, 3])?.result?.[0]
  const usedVouchersNum = useSingleCallResult(hValueContract, 'exchangeTimes', [account ?? undefined])?.result?.[0]
  const [{ minting, minthash, mintErrorMessage }, setModal] = useState<{
    minting: boolean
    minthash: string | undefined
    mintErrorMessage: string | undefined
  }>({
    minting: false,
    minthash: undefined,
    mintErrorMessage: undefined,
  })

  const handleDismissSubmissionModal = useCallback(() => {
    setModal({
      minting: false,
      minthash: undefined,
      mintErrorMessage: undefined,
    })
  }, [setModal])

  const exchangeHoliday = useCallback(() => {
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })
    hValueContract
      ?.exchangeHoliday(1)
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
  }, [addTransaction, minthash, mintErrorMessage, hValueContract])

  return account ? (
    <PersonalWrapper gap="54px">
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <BenefitCenter>
        <TYPE.largeHeader>Benefit Center</TYPE.largeHeader>
        <BenefitImg src={Person} />
        {/* <AbsImg src={Person} width="408px" height="192px" right="46px" /> */}
      </BenefitCenter>
      <HolidayCard>
        <HolidayDescWrapper>
          <img src={Vouchers} alt="Roll" height="130" />
          <Row justify={'center'}>
            <TYPE.largeHeader color={'white'} fontSize={48}>
              x {''} {balanceOf ? Number(balanceOf) : 0}
            </TYPE.largeHeader>
          </Row>

          <TYPE.body color={'white'}>
            Note:
            <br />5 H value holiday coupons can be exchanged for one day of holiday
          </TYPE.body>
          {balanceOf && Number(balanceOf) > 0 ? (
            <Row justify="end">
              <ExchangeButton onClick={exchangeHoliday}>Exchange</ExchangeButton>
            </Row>
          ) : (
            <Row justify="end">
              <ExchangeButton disabled>Exchange</ExchangeButton>
            </Row>
          )}
        </HolidayDescWrapper>
      </HolidayCard>
      <HolidayCardGary>
        <HolidayDescWrapper>
          <img src={UsedVouchers} alt="Roll" height="130" />
          <Row justify={'center'}>
            <TYPE.largeHeader color={'white'} fontSize={48}>
              x {''} {usedVouchersNum ? Number(usedVouchersNum) : 0}
            </TYPE.largeHeader>
          </Row>

          <TYPE.body color={'white'}>
            Note:
            <br />5 H value holiday coupons can be exchanged for one day of holiday
          </TYPE.body>
          <Row justify="end">
            <ExchangeButtonGary>Used</ExchangeButtonGary>
          </Row>
        </HolidayDescWrapper>
      </HolidayCardGary>
    </PersonalWrapper>
  ) : null
}
