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
import { useHistory, useLocation } from 'react-router-dom'

const PersonalWrapper = styled(AutoColumn)`
  position: relative;
  max-width: 1200px;
  padding: 120px 0px 0px 16px;
  width: 100%;
  height: 100%;
`
const BenefitCenter = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.black};
  height: 192px;
`

const BenefitImg = styled.img`
  position: absolute;
  width: 408px;
  right: 46px;
  bottom: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    height: unset;
    z-index: -1;
  `};
`

const ButtonBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 12px;
  position: absolute;
  left: 0;
  bottom: 30px;
`

const RareButtonOutlined = styled(ButtonOutlined)<{ showActivity: boolean }>`
  color: ${({ theme, showActivity }) => (showActivity ? theme.white : theme.black)};
  background: ${({ showActivity }) =>
    showActivity ? 'linear-gradient(134deg, #ff26b3 0%, #ff42ab 20%, #ffb38b 100%)' : 'unset'};
  border: ${({ showActivity }) => showActivity && 'none'};
  border-radius: 4px;
  padding: 4px 10px;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.white};
    box-shadow: none;
    border: none;
    background: linear-gradient(134deg, #ff26b3 0%, #ff42ab 20%, #ffb38b 100%);
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4px;
  `};
`
const GeneralButtonOutlined = styled(RareButtonOutlined)`
  background: ${({ showActivity }) => showActivity && '#2e03f3'};
  &:hover,
  &:active {
    border: 1px solid #2e03f3;
    background: #2e03f3;
    box-shadow: 0px 1px 4px 0px rgba(46, 3, 243, 0.3), 0px 2px 4px 0px rgba(46, 3, 243, 0.15);
  }
`

export default function Personal() {
  const { pathname } = useLocation()
  const isRareToggled = pathname.includes('/rare')
  const isHolidayToggled = pathname.includes('/holiday')

  return (
    <PersonalWrapper gap="54px">
      <BenefitCenter>
        <TYPE.largeHeader alignSelf={'center'} color={['white', 'black']}>
          Benefit Center
        </TYPE.largeHeader>
        <BenefitImg src={Person} />
        <ActivitySwitcher
          showActivity={{
            isRareToggled,
            isHolidayToggled,
          }}
        />
      </BenefitCenter>
      {isRareToggled ? <Rare /> : isHolidayToggled ? <Holiday /> : <Mine />}
    </PersonalWrapper>
  )
}

const ActivitySwitcher = ({
  showActivity,
}: {
  showActivity: {
    isRareToggled: boolean
    isHolidayToggled: boolean
  }
}) => {
  const history = useHistory()

  return (
    <ButtonBox>
      <GeneralButtonOutlined
        onClick={() => (showActivity.isHolidayToggled || showActivity.isRareToggled) && history.push('/personal')}
        showActivity={!showActivity.isHolidayToggled && !showActivity.isRareToggled}
      >
        Asset
      </GeneralButtonOutlined>
      <GeneralButtonOutlined
        onClick={() => !showActivity.isHolidayToggled && history.push('/personal/holiday')}
        showActivity={showActivity.isHolidayToggled}
      >
        Holiday Exchange
      </GeneralButtonOutlined>
      <RareButtonOutlined
        onClick={() => !showActivity.isRareToggled && history.push('/personal/rare')}
        showActivity={showActivity.isRareToggled}
      >
        Rares Exchange
      </RareButtonOutlined>
    </ButtonBox>
  )
}
