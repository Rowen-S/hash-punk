import { useState } from 'react'
import { Text } from 'rebass'
import { TYPE, CloseIcon } from 'theme'
import { ButtonBlue } from 'components/Button'
import Modal from 'components/Modal'
import { Trans } from '@lingui/macro'
import { RowBetween } from '../Row'
import styled from 'styled-components/macro'
import { Check } from 'react-feather'
import useTheme from '../../hooks/useTheme'
import Nft01 from 'assets/preview/001.png'

const SelectNFTWrapper = styled.div`
  width: 100%;
  padding: 24px;
`
const RowMargin = styled(RowBetween)`
  margin: 24px 0;
`
const RareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
`
const TokenText = styled(Text)`
  color: #3500fe;
  margin: 0 16px !important;
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

const ResponsiveCheck = styled(Check)`
  size: 13px;
`
const ExchangeRare = ({ onDismiss, isOpen }: { onDismiss: () => void; isOpen: boolean }) => {
  const theme = useTheme()

  const [tokenId, setToken] = useState<string>()
  return (
    <>
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <SelectNFTWrapper>
          <RowMargin>
            <TYPE.subHeader>请选择要移除的NFT</TYPE.subHeader>
            <CloseIcon onClick={onDismiss} />
          </RowMargin>
          <RowMargin onClick={() => setToken('#0012')}>
            <RareBox>
              <img src={Nft01} height="72" />
              <TokenText>#0012</TokenText>
              <RareTag>稀有</RareTag>
            </RareBox>
            {/*  */}
            {tokenId === '#0012' ? (
              <ActiveCircle>
                <ResponsiveCheck size={13} stroke={theme.white} />
              </ActiveCircle>
            ) : (
              <Circle></Circle>
            )}
          </RowMargin>
          <RowMargin onClick={() => setToken('#0013')}>
            <RareBox>
              <img src={Nft01} height="72" />
              <TokenText>#0013</TokenText>
              <RareTag>稀有</RareTag>
            </RareBox>
            {tokenId === '#0013' ? (
              <ActiveCircle>
                <ResponsiveCheck size={13} stroke={theme.white} />
              </ActiveCircle>
            ) : (
              <Circle></Circle>
            )}
          </RowMargin>
          <ButtonBlue disabled={!tokenId} onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
            <Text fontWeight={500} fontSize={20}>
              <Trans>立即兑换</Trans>
            </Text>
          </ButtonBlue>
        </SelectNFTWrapper>
      </Modal>
    </>
  )
}
export default ExchangeRare
