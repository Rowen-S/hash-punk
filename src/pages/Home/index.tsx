import { AutoColumn, ColumnCenter } from 'components/Column'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Row, { RowBetween } from 'components/Row'

import { Box, Image } from 'rebass/styled-components'
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
  ${RowBetween} {
    ${({ theme }) => theme.mediaWidth.upToSmall`
      flex-direction: column;
    `};
  }
`

const HomeAboutContent = styled(AutoColumn)`
  max-width: 1200px;
  margin: 0px auto;
  position: relative;
  padding: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      ${RowBetween} {
        flex-direction: column;
      }
  `};
`

const SwiperWrapper = styled(AutoColumn)`
  margin: 110px 0;
`

const AboutImg = styled(AbsImg)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

export default function Home() {
  return (
    <HomeWrapper>
      <BannerWrapper>
        <BannerDiv />
      </BannerWrapper>
      <HomeAbout>
        <AboutImg src={Triangle03} width="50%" height="610px" right="0" top="1050px" bottom="50%" zIndex={1} />
        <AboutImg src={Triangle02} width="32%" height="410px" right="0" top="1050px" bottom="50%" zIndex={2} />
        <AboutImg src={Triangle01} width="15%" height="215px" right="0" top="1050px" bottom="50%" zIndex={3} />
        <HomeAboutContent gap="90px">
          <TYPE.largeHeader fontSize={42} textAlign={['start', 'center']}>
            HashPunk is an experiment about web3
          </TYPE.largeHeader>

          <Image
            src={LogoGreen}
            width="100%"
            height="250px"
            marginTop={[100, 260]}
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
            <TYPE.label alignSelf={['flex-start', 'start']} fontSize={42} color="white">
              ART & <br /> PROJECT <br /> IN WEB3
            </TYPE.label>
            <Box marginTop={[20, 0]}>
              <AutoColumn gap="21px">
                <TYPE.largeHeader color="white">
                  We make good
                  <br />
                  and fun things.
                </TYPE.largeHeader>
                <TYPE.label color="white" fontWeight={500} lineHeight="1.5" style={{ zIndex: 1 }}>
                  3,000 unique collectible characters with proof of ownership stored <br /> on the Matic blockchain. No
                  two are exactly alike, and each one <br /> of them can be officially owned by a single person on the
                  Matic <br /> blockchain.
                </TYPE.label>
              </AutoColumn>
            </Box>
          </RowBetween>
          <AbsImg className="art" src={Slash} height="373px" right="0" top="250px" zIndex={0} />
          <AbsImg className="art" src={Slash} height="373px" right="0" top="347px" zIndex={0} />
          <AbsImg className="art" src={Circle} width="116px" height="116px" right="0" top="190px" zIndex={0} />

          <Image
            src={LogoRed}
            width="100%"
            height="250px"
            sx={{
              zIndex: 1,
            }}
          />
          <Box marginTop={[0, 250]} />
        </HomeAboutContent>
        <Line />
        <HomeAboutContent>
          <Box
            width={['100%', '640px']}
            display={'flex'}
            flexDirection={['column', 'row']}
            justifyContent={'space-between'}
            marginBottom={[80, 100]}
            marginTop={[40, 85]}
          >
            <TYPE.label minWidth="unset" fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> TEAM
            </TYPE.label>
            <Box marginTop={[20, 0]}>
              <AutoColumn gap="lg">
                <TYPE.label fontSize={18} color="white">
                  ◆ Corp Function Shanghai
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Hashkey DEX
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Hashkey Pro
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Hashquark
                </TYPE.label>
              </AutoColumn>
            </Box>
          </Box>
        </HomeAboutContent>
        <HomeAboutContent>
          <RowBetween marginBottom={[80, 100]} marginTop={[40, 85]}>
            <TYPE.label width={650} fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> H VALUE
            </TYPE.label>
            <RowBetween align="unset" marginTop={[20, 0]}>
              <TYPE.white fontSize={20} lineHeight="1.5" width={['100%', '480px']}>
                &quot;H-Value&#34; is a reward mechanism that can be obtained by participating in internal activities.
                <br />
                <br />
                You can exchange 50 H-Values for one HashPunk. If you exchange for a rare HashPunk, you will receive an
                additional surprise.
              </TYPE.white>
              <AutoColumn>
                <img src={Hvalue} width={240} height={240} />
              </AutoColumn>
            </RowBetween>
          </RowBetween>
        </HomeAboutContent>
      </HomeAbout>
      <HomeContent>
        <HomeAboutContent>
          <RowBetween marginBottom={[80, 100]} marginTop={[40, 85]}>
            <TYPE.label width={['100%', 650]} fontSize={42} alignSelf="flex-start" color="white">
              ABOUT <br /> LUCKYPASS
            </TYPE.label>
            <RowBetween align="unset" marginTop={[20, 0]}>
              <TYPE.white fontSize={20} lineHeight="1.5" width={['100%', '480px']}>
                &quot;LuckyPass&#34; is another type of reward card that can be obtained by participating in internal
                activities.
                <br />
                <br />
                You can mint one Hashpunk by collecting five &quot;LuckyPass&#34; cards.
              </TYPE.white>
              <Image marginTop={[20, 0]} src={'/preview/luckyPass.gif'} width={240} height={240} />
            </RowBetween>
          </RowBetween>
        </HomeAboutContent>
        <HomeAboutContent>
          <RowBetween marginBottom={[80, 100]} marginTop={[20, 85]}>
            <TYPE.label width={['100%', 650]} fontSize={42} alignSelf="flex-start" color="white">
              STATEMENT
            </TYPE.label>
            <Row marginTop={[20, 0]}>
              <TYPE.label fontSize={20} lineHeight={1.5} width="720px" color="white">
                This website is only for HashKey Shanghai technical team members, intended to motivate them to
                participate in internal activities. The criteria for obtaining H-value or related digital collectibles
                casting qualifications are specified in the Shanghai technical team employee handbook.
                <br /> <br />
                The digital collectibles minted by employees through this website only have collection value, and
                employees are not allowed to engage in any type of transaction related to the digital collectibles,
                including listing the digital collectibles obtained on digital collectible trading platforms for sale.
                The company reserves the right to modify or terminate the activity rules and the duration of the
                activity displayed on this website at any time.
              </TYPE.label>
            </Row>
          </RowBetween>
        </HomeAboutContent>
        <Line />
        <HomeAboutContent>
          <RowBetween marginBottom={[80, 100]} marginTop={[40, 85]}>
            <TYPE.label fontSize={42} marginBottom={[20, 0]} alignSelf={'flex-start'} color="white">
              FAQ
            </TYPE.label>
            <QaContent />
          </RowBetween>
          <Image src={Twitter} margin="0px auto 30px auto" />
          <Row justify="center">
            {/* <Line width={90} /> */}
            <Image src={Cat} width="47" height="40" marginX={50} />
            {/* <Line width={90} /> */}
          </Row>
          <Row justify="center" marginTop={40}>
            <TYPE.label fontSize={16} lineHeight={1.5} opacity="0.5" color="white">
              All rights reserved by Shanghai tech team
            </TYPE.label>
          </Row>
        </HomeAboutContent>
      </HomeContent>
    </HomeWrapper>
  )
}
