import { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Row from 'components/Row'
import Card from 'components/Card'
import { ButtonOutlined } from 'components/Button'
import RareImg from 'assets/svg/rareImg.png'
import { useActiveWeb3React } from 'hooks/web3'
import { useHashPunkContract, useHVlaueContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { CertificateCard } from 'components/Certificate'
import { random } from 'utils'

const RareCardBorder = styled.div`
  background: linear-gradient(180deg, rgba(255, 38, 179, 1) 0%, rgba(255, 179, 139, 1) 100%);
  border-radius: 8px;
  padding: 2px;
  // background-clip: padding-box;
`

const RareCard = styled(Card)`
  ${({ theme }) => theme.flexRowNoWrap};
  border-radius: 8px;
  background: linear-gradient(87deg, #ff26b3 0%, #ffb38b 100%);
`

const RareDescWrapper = styled.div`
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

export default function Rare() {
  const { account } = useActiveWeb3React()
  const hValueContract = useHVlaueContract()
  const addTransaction = useTransactionAdder()
  const hPunkContract = useHashPunkContract()
  // rare lists note: undefined ? No rarity : xxx.length
  const rareList = useSingleCallResult(hPunkContract, 'getUserToRareIds', [account ?? undefined])?.result?.[0]

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

  const exchangeRare = useCallback(() => {
    if (!rareList?.length) return
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })
    hValueContract
      ?.exchangeHValue(random(rareList))
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
  }, [addTransaction, minthash, mintErrorMessage, hValueContract, rareList])

  return (
    <>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      <RareCardBorder>
        <RareCard>
          <RareDescWrapper>
            <CertificateCard bg={RareImg} color="#fff" chinese="H值兑换券" english="H-value redemption coupon" />
            <Row justify={'center'}>
              <TYPE.largeHeader color={'white'} fontSize={48}>
                x {''} {rareList ? rareList?.length : 0}
              </TYPE.largeHeader>
            </Row>

            <TYPE.body color={'white'}>
              Note:
              <br />5 H value holiday coupons can be exchanged for one day of holiday
            </TYPE.body>
            {rareList && rareList?.length > 0 ? (
              <Row justify="end">
                <ExchangeButton onClick={exchangeRare}>Exchange</ExchangeButton>
              </Row>
            ) : (
              <Row justify="end">
                <ExchangeButton disabled>Exchange</ExchangeButton>
              </Row>
            )}
          </RareDescWrapper>
        </RareCard>
      </RareCardBorder>
    </>
  )
}
