import { Text } from 'rebass'
import Card from 'components/Card'
import Row from 'components/Row'
import styled from 'styled-components/macro'
import Nft01 from 'assets/preview/001.png'
import NoneImg from 'assets/images/noneImg.png'

const VerticalRow = styled(Row)`
  flex-flow: row wrap;
  margin-left: -8px;
  margin-right: -8px;
  row-gap: 24px;
`
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
const TextToken = styled(Text)`
  width: 100%;
  text-align: center;
`
const Nothing = styled.img`
  display: block;
  margin: auto;
`
export default function Mine() {
  return (
    <>
      <Nothing src={NoneImg} />
      <VerticalRow>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken color={'#3300FF'}>#0012</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
        <VerticalCard>
          <MineImg src={Nft01} />
          <TextToken>#0013</TextToken>
        </VerticalCard>
      </VerticalRow>
    </>
  )
}
