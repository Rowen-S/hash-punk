import { useCallback, useState } from 'react'
import styled from 'styled-components/macro'
import { TYPE, CloseIcon } from 'theme'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'
import Row, { RowBetween } from 'components/Row'
import Card from 'components/Card'
import { ButtonOutlined, ButtonBlue } from 'components/Button'
import RareImg from 'assets/svg/rareImg.png'
import { useActiveWeb3React } from 'hooks/web3'
import { useHashPunkContract, useHVlaueContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import TransactionSubmissionModal from 'components/TransactionSubmissionModal'
import { CertificateCard } from 'components/Certificate'
// import ExchangeRare from 'components/ExchangeRare'
import Modal from 'components/Modal'
import { SelectImgOpton } from 'components/TokenInterface'

const RareCardBorder = styled.div`
  background: linear-gradient(180deg, rgba(255, 38, 179, 1) 0%, rgba(255, 179, 139, 1) 100%);
  border-radius: 8px;
  padding: 2px;
`

const RareCard = styled(Card)`
  /* ${({ theme }) => theme.flexRowNoWrap}; */
  border-radius: 8px;
  background: linear-gradient(87deg, #ff26b3 0%, #ffb38b 100%);
`

const RareDescWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
  `};
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

const SelectNFTWrapper = styled.div`
  width: 100%;
  padding: 24px;
`
const RowMargin = styled(RowBetween)`
  margin: 24px 0;
`

export default function Rare() {
  const { account } = useActiveWeb3React()
  const hValueContract = useHVlaueContract()
  const addTransaction = useTransactionAdder()
  const hPunkContract = useHashPunkContract()
  // rare lists note: undefined ? No rarity : xxx.length
  // const rareList = [1033, 470]
  const rareList = useSingleCallResult(hPunkContract, 'getUserToRareIds', [account ?? undefined])?.result?.[0]

  // console.log(
  //   'rareList',
  //   rareList,
  //   rareList?.map((x: { toNumber: () => any }) => x.toNumber())
  // )

  const [open, setOpen] = useState<boolean>(false)
  const [tokenId, setToken] = useState<number>(0)

  const [{ minting, minthash, mintErrorMessage }, setModal] = useState<{
    minting: boolean
    minthash: string | undefined
    mintErrorMessage: string | undefined
  }>({
    minting: false,
    minthash: undefined,
    mintErrorMessage: undefined,
  })
  const handleOnClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleDismissSubmissionModal = useCallback(() => {
    setModal({
      minting: false,
      minthash: undefined,
      mintErrorMessage: undefined,
    })
    setToken(0)
  }, [setModal])

  const exchangeRare = useCallback(() => {
    if (!rareList?.length || !tokenId) return
    setOpen(false)
    setModal({
      minting: true,
      minthash,
      mintErrorMessage,
    })
    hValueContract
      ?.exchangeHValue(tokenId)
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
  }, [addTransaction, minthash, mintErrorMessage, hValueContract, rareList, tokenId])

  return (
    <>
      <TransactionSubmissionModal
        isOpen={minting}
        hash={minthash}
        onDismiss={handleDismissSubmissionModal}
        errorMessage={mintErrorMessage}
      />
      {/* <ExchangeRare isOpen={false} onDismiss={handleDismissSubmissionModal} /> */}
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
              注:
              <br /> 持有1张稀有NFT可兑换70H值
            </TYPE.body>
            {rareList && rareList?.length > 0 ? (
              <Row justify="end">
                <ExchangeButton onClick={() => setOpen(true)}>Exchange</ExchangeButton>
              </Row>
            ) : (
              <Row justify="end">
                <ExchangeButton disabled>Exchange</ExchangeButton>
              </Row>
            )}
          </RareDescWrapper>
        </RareCard>
      </RareCardBorder>
      <Modal isOpen={open} onDismiss={handleOnClose}>
        <SelectNFTWrapper>
          <RowMargin>
            <TYPE.subHeader>请选择要移除的NFT</TYPE.subHeader>
            <CloseIcon onClick={handleOnClose} />
          </RowMargin>
          {rareList && rareList?.length > 0 ? (
            <SelectImgOpton tokenIds={rareList?.map((x: any) => Number(x))} tid={tokenId} toggle={setToken} />
          ) : // <>
          //   {rareList.map((item: any) => (
          //     <RowMargin key={item} onClick={() => setToken(Number(item))}>
          //       <RareBox>
          //         <TokenImgBox>
          //           {/* <TokenImg tokenId={Number(item)} /> */}
          //           <CollectionImage tokenIds={[Number(item)]} />
          //         </TokenImgBox>
          //         <TokenText>#{Number(item)}</TokenText>
          //         <RareTag>稀有</RareTag>
          //       </RareBox>
          //       {tokenId === Number(item) ? (
          //         <ActiveCircle>
          //           <ResponsiveCheck size={13} stroke={'white'} />
          //         </ActiveCircle>
          //       ) : (
          //         <Circle></Circle>
          //       )}
          //     </RowMargin>
          //   ))}
          // </>
          null}
          <ButtonBlue disabled={!tokenId} onClick={exchangeRare} style={{ margin: '20px 0 0 0' }}>
            <Text fontWeight={500} fontSize={20}>
              <Trans>立即兑换</Trans>
            </Text>
          </ButtonBlue>
        </SelectNFTWrapper>
      </Modal>
    </>
  )
}
