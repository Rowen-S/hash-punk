import { AutoColumn, ColumnCenter } from 'components/Column'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Row, { RowBetween } from 'components/Row'

import { Image } from 'rebass/styled-components'
import SwiperPage from './SwiperPage'
import QaContent from './QaContent'

import GlobalBg from 'assets/images/bg.png'
// import Author from 'assets/images/author.png'
import LogoGreen from 'assets/svg/logo-green.svg'
import LogoRed from 'assets/svg/logo-red.svg'
import Triangle01 from 'assets/images/triangle01.png'
import Triangle02 from 'assets/images/triangle02.png'
import Triangle03 from 'assets/images/triangle03.png'
import FirstScreen from 'assets/images/firstScreen.png'

import Circle from 'assets/images/circle.png'
import Cat from 'assets/images/cat.png'
import Slash from 'assets/svg/slash01.svg'
import Twitter from 'assets/svg/twitter.svg'
import { AbsImg, Line } from 'pages/styled'
import Hvalue from 'assets/images/hvalue.png'

const HomeWrapper = styled(AutoColumn)`
  /* position: relative; */
  width: 100%;
  /* max-width: 1440px; */
  /* height: 100vh; */
  /* overflow: hidden;
  overflow-y: auto; */
`
const BannerWrapper = styled(ColumnCenter)`
  // background-color: #3300ff;
  background-image: url(${FirstScreen});
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: 18vh;
  height: 100vh;
  position: relative;
`
const BannerDiv = styled.div`
  background-color: #3300ff;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  // animation: run 5s infinite;
  animation: run 1.5s;
  z-index: -1;
  @keyframes run {
    0% {
      width: 100px;
      right: 0;
    }
    70% {
      right: 100%;
    }
    71% {
      right: 0;
      width: 100px;
    }
    100% {
      right: 0;
      width: 100%;
    }
  }
`

const HomeAbout = styled.div`
  width: 100%;
  /* position: relative; */
  padding: 150px 0 0 0;
  /* background: ${({ theme }) => theme.white}; */
  background: url(${GlobalBg}) no-repeat;
  background-size: 214% 93%;
  background-position: center bottom;
`

const HomeContent = styled.div`
  width: 100%;
  /* position: relative; */
  padding: 0 0 150px 0;
  background: ${({ theme }) => theme.black};
`

const HomeAboutContent = styled(AutoColumn)`
  max-width: 1200px;
  margin: 0px auto;
  position: relative;
`

const SwiperWrapper = styled(AutoColumn)`
  margin: 110px 0;
`

export default function Home() {
  return (
    <HomeWrapper>
      <BannerWrapper>
        <BannerDiv />
      </BannerWrapper>
      <HomeAbout>
        {/* <AbsImg src={GlobalBg} width="100%" height="80%" bottom="0" zIndex={0} /> */}

        <AbsImg src={Triangle03} width="50%" height="610" right="0" top="1050px" bottom="50%" zIndex={1} />
        <AbsImg src={Triangle02} width="32%" height="410" right="0" top="1050px" bottom="50%" zIndex={2} />
        <AbsImg src={Triangle01} width="15%" height="215" right="0" top="1050px" bottom="50%" zIndex={3} />
        <HomeAboutContent gap="90px">
          <TYPE.largeHeader fontSize={42} textAlign="center">
            HashPunk is an experiment about web3
          </TYPE.largeHeader>

          <AutoColumn gap="lg">
            {/* <TYPE.black fontSize={18}>INCLUDE</TYPE.black>
            <TYPE.black fontSize={18}>5000 UNIQUE</TYPE.black>
            <TYPE.black fontSize={18}>ON MATIC</TYPE.black> */}
          </AutoColumn>
          <Image
            src={LogoGreen}
            width="100%"
            height="250px"
            marginTop={260}
            sx={{
              zIndex: 1,
            }}
          />
        </HomeAboutContent>

        <SwiperWrapper>
          <SwiperPage />
        </SwiperWrapper>
        <HomeAboutContent gap="53px">
          <RowBetween>
            <TYPE.label fontSize={42} color="white">
              ART & <br /> PROJECT <br /> IN WEB3
            </TYPE.label>
            <AutoColumn gap="21px">
              <TYPE.largeHeader color="white">
                We make good
                <br />
                and fun things.
              </TYPE.largeHeader>
              <TYPE.label color="white">
                3,000 unique collectible characters with proof of ownership stored <br /> on the Matic blockchain. No
                two are exactly alike, and each one <br /> of them can be officially owned by a single person on the
                Matic <br /> blockchain.
              </TYPE.label>
            </AutoColumn>
          </RowBetween>
          <AbsImg src={Slash} height="373" right="0" top="250px" zIndex={0} />
          <AbsImg src={Slash} height="373" right="0" top="347px" zIndex={0} />
          <AbsImg src={Circle} width="116" height="116" right="0" top="190px" zIndex={0} />

          <Image
            src={LogoRed}
            width="100%"
            height="250px"
            sx={{
              zIndex: 1,
            }}
          />
          <Row marginTop={250} />
          {/* <TYPE.label fontSize={42} marginTop={-10} color="white">
            About <br /> Author
          </TYPE.label> */}
          {/* <RowBetween marginTop={47} marginBottom={137}>
            <Row width={'195px'} justify="center">
              <Image src={Author} width="116px" height="197px" />
            </Row>
            <TYPE.label fontSize={18} marginRight={20} color="white">
              A designer / <br />
              A crypto Holder //
              <br />
              <br />
              Maybe you know him, maybe you don&apos;t, but that&apos;s okay ///
            </TYPE.label>
          </RowBetween> */}
        </HomeAboutContent>
        <Line />
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label width={450} fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> TEAM
            </TYPE.label>
            <AutoColumn gap="42px">
              <TYPE.label fontSize={18} color="white">
                In 2022, Five friends launched the HashPunk, and they tried to build a new visual aesthetic.{' '}
              </TYPE.label>
              <AutoColumn gap="lg">
                <TYPE.label fontSize={18} color="white">
                  ◆ Corp Function
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mrs. Bonnie blue
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mr. Zhi
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mr. YAO
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mr. Jack Quan
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mrs. Shuya
                </TYPE.label>
              </AutoColumn>
            </AutoColumn>
          </RowBetween>
        </HomeAboutContent>
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label width={650} fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> H VALUE
            </TYPE.label>
            <RowBetween>
              <AutoColumn gap="42px">
                <TYPE.label fontSize={24} width="480px" color="white">
                  &quot;H-Value&#34; is a reward mechanism that can be obtained by participating in internal activities.
                  <br />
                  <br />
                  You can exchange 50 H-Values for one HashPunk. If you exchange for a rare HashPunk, you will receive
                  an additional surprise.
                </TYPE.label>
              </AutoColumn>
              <AutoColumn>
                <img src={Hvalue} width={240} height={240} />
              </AutoColumn>
            </RowBetween>
          </RowBetween>
        </HomeAboutContent>
      </HomeAbout>
      <HomeContent>
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label width={650} fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> LUCKYPASS
            </TYPE.label>
            <RowBetween>
              <AutoColumn gap="42px">
                <TYPE.label fontSize={24} width="480px" color="white">
                  &quot;LuckyPass&#34; is another type of reward card that can be obtained by participating in internal
                  activities.
                  <br />
                  <br />
                  You can mint one Hashpunk by collecting five &quot;LuckyPass&#34; cards.
                </TYPE.label>
              </AutoColumn>
              <AutoColumn>
                <img src={'/preview/luckyPass.gif'} width={240} height={240} />
              </AutoColumn>
            </RowBetween>
          </RowBetween>
        </HomeAboutContent>
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label width={650} fontSize={42} alignSelf="flex-start" color="white">
              Statement
            </TYPE.label>
            <RowBetween>
              <AutoColumn gap="42px">
                <TYPE.label fontSize={24} width="720px" color="white">
                  This website is only for HashKey Shanghai technical team members, intended to motivate them to
                  participate in internal activities. The criteria for obtaining H-value or related digital collectibles
                  casting qualifications are specified in the Shanghai technical team member manual.
                  <br />
                  The digital collectibles cast by employees through this website only have collection value, and
                  employees are not allowed to engage in any type of transaction related to the digital collectibles,
                  including listing the digital collectibles obtained on digital collectible trading platforms for sale.
                  The company reserves the right to modify or terminate the activity rules and the duration of the
                  activity displayed on this website at any time.
                </TYPE.label>
              </AutoColumn>
              {/* <AutoColumn>
                <img src={'/preview/luckyPass.gif'} width={240} height={240} />
              </AutoColumn> */}
            </RowBetween>
          </RowBetween>
        </HomeAboutContent>
        <Line />
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label fontSize={42} alignSelf="flex-start" color="white">
              FAQ
            </TYPE.label>
            <QaContent />
          </RowBetween>
          <Image src={Twitter} margin="0px auto 30px auto" />
          <Row justify="center">
            <Line width={90} />
            <Image src={Cat} width="47" height="40" marginX={50} />
            <Line width={90} />
          </Row>
          <Row justify="center" marginTop={10}>
            <TYPE.label fontSize={16} color="white">
              All rights reserved by Shanghai tech team
            </TYPE.label>
          </Row>
        </HomeAboutContent>
      </HomeContent>
    </HomeWrapper>
  )
}
