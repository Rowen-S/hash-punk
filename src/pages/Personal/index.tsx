import { RowBetween } from 'components/Row'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import { AutoColumn } from 'components/Column'
// import { AbsImg } from 'pages/styled'
import { Box } from 'rebass'
import { ButtonOutlined } from 'components/Button'
import Person from 'assets/images/person@2x.png'
import Holiday from './Holiday'
import Mine from './Mine'
import Rare from './Rare'
import { useState } from 'react'

const PersonalWrapper = styled(AutoColumn)`
  position: relative;
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
const ButtonBox = styled(Box)`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 30px;
`
const BlueBox = styled.div`
  margin-right: 12px;
`
const BlueBtn = styled(ButtonOutlined)`
  padding: 5px 30px;
  border-radius: 4px;
  &:hover,
  &:active {
    color: #fff;
    border: 1px solid #2e03f3;
    background: #2e03f3;
    box-shadow: 0px 1px 4px 0px rgba(46, 3, 243, 0.3), 0px 2px 4px 0px rgba(46, 3, 243, 0.15);
  }
`
const BlueActive = styled(ButtonOutlined)`
  padding: 5px 30px;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #2e03f3;
  background: #2e03f3;
  box-shadow: 0px 1px 4px 0px rgba(46, 3, 243, 0.3), 0px 2px 4px 0px rgba(46, 3, 243, 0.15);
`
const RareBtn = styled.div`
  border: 1px solid #ced0d9;
  border-radius: 4px;
  padding: 1px;
  &:hover,
  &:active {
    border-color: transparent;
    box-shadow: 0px 1px 4px 0px rgba(255, 87, 164, 0.2), 0px 2px 4px 0px rgba(255, 98, 162, 0.4);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(255, 38, 179, 1) 0%, rgba(255, 179, 139, 1) 100%);
  }
`
const RareText = styled(ButtonOutlined)`
  display: block;
  padding: 4px 29px;
  border: none;
  border-radius: 4px;
  &:hover,
  &:active {
    box-shadow: none;
    border: none;
    background: linear-gradient(134deg, #ff26b3 0%, #ff42ab 20%, #ffb38b 100%);
    border-radius: 4px;
  }
`
const RareActive = styled.div`
  padding: 1px;
  border-color: transparent;
  box-shadow: 0px 1px 4px 0px rgba(255, 87, 164, 0.2), 0px 2px 4px 0px rgba(255, 98, 162, 0.4);
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(255, 38, 179, 1) 0%, rgba(255, 179, 139, 1) 100%);
`
const RareActiveBtn = styled(ButtonOutlined)`
  padding: 5px 30px;
  border-radius: 4px;
  box-shadow: none;
  border: none;
  background: linear-gradient(134deg, #ff26b3 0%, #ff42ab 20%, #ffb38b 100%);
  border-radius: 4px;
  color: #fff;
  &:hover,
  &:active {
    box-shadow: none;
    border: none;
  }
`

export default function Personal() {
  const [type, setType] = useState<number>(1)
  const handleChange = (v: number) => {
    setType(v)
  }
  return (
    <PersonalWrapper gap="54px">
      <BenefitCenter>
        <TYPE.largeHeader>Benefit Center</TYPE.largeHeader>
        <BenefitImg src={Person} />
        {/* <AbsImg src={Person} width="408px" height="192px" right="46px" /> */}
        <ButtonBox>
          {type === 1 ? (
            <BlueBox>
              <BlueActive>我的HashPunk</BlueActive>
            </BlueBox>
          ) : (
            <BlueBox>
              <BlueBtn onClick={() => handleChange(1)}>我的HashPunk</BlueBtn>
            </BlueBox>
          )}
          <BlueBox>
            {type === 2 ? (
              <BlueActive>假期兑换</BlueActive>
            ) : (
              <BlueBtn onClick={() => handleChange(2)}>假期兑换</BlueBtn>
            )}
          </BlueBox>
          {type === 3 ? (
            <RareActive>
              <RareActiveBtn>稀有兑换</RareActiveBtn>
            </RareActive>
          ) : (
            <RareBtn>
              <RareText onClick={() => handleChange(3)}>稀有兑换</RareText>
            </RareBtn>
          )}
        </ButtonBox>
      </BenefitCenter>
      {type === 1 ? <Mine /> : type === 2 ? <Holiday /> : type === 3 ? <Rare /> : null}
    </PersonalWrapper>
  )
}
