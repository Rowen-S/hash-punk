import { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Row from 'components/Row'
import Card from 'components/Card'
import { ButtonOutlined } from 'components/Button'
import Vouchers from 'assets/svg/vouchers.png'
import UsedVouchers from 'assets/svg/usedVouchers.png'
import { useActiveWeb3React } from 'hooks/web3'
import { useHVlaueContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { CertificateCard } from 'components/Certificate'

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
export default function Holiday() {
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

  return (
    <>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <HolidayCard>
        <HolidayDescWrapper>
          <CertificateCard bg={Vouchers} color="#000" chinese="假期兑换券" english="Holiday Redemption Vouchers" />
          <Row justify={'center'}>
            <TYPE.largeHeader color={'white'} fontSize={48}>
              x {''} {balanceOf ? Number(balanceOf) : 0}
            </TYPE.largeHeader>
          </Row>

          <TYPE.body color={'white'}>
            一张券兑换一天假期
            <br />1 holiday coupons can be exchanged for one day of holiday
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
          <CertificateCard bg={UsedVouchers} color="#000" chinese="假期兑换券" english="Holiday Redemption Vouchers" />
          <Row justify={'center'}>
            <TYPE.largeHeader color={'white'} fontSize={48}>
              x {''} {usedVouchersNum ? Number(usedVouchersNum) : 0}
            </TYPE.largeHeader>
          </Row>

          <TYPE.body color={'white'}>
            一张券兑换一天假期
            <br />1 holiday coupons can be exchanged for one day of holiday
          </TYPE.body>
          <Row justify="end">
            <ExchangeButtonGary>Used</ExchangeButtonGary>
          </Row>
        </HolidayDescWrapper>
      </HolidayCardGary>
    </>
  )
}
