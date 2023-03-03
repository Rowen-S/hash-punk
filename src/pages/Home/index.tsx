import { AutoColumn } from 'components/Column'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'
import Row, { RowBetween } from 'components/Row'

import { Image } from 'rebass/styled-components'
import SwiperPage from './SwiperPage'

import GlobalBg from 'assets/images/bg.png'
import Author from 'assets/images/author.png'
import LogoGreen from 'assets/svg/logo-green.svg'
import LogoRed from 'assets/svg/logo-red.svg'
import Triangle01 from 'assets/images/triangle01.png'
import Triangle02 from 'assets/images/triangle02.png'
import Triangle03 from 'assets/images/triangle03.png'

import Circle from 'assets/images/circle.png'
import Cat from 'assets/images/cat.png'
import Slash from 'assets/svg/slash01.svg'
import Twitter from 'assets/svg/twitter.svg'
import { AbsImg, Line } from 'pages/styled'

const HomeWrapper = styled(AutoColumn)`
  /* position: relative; */
  width: 100%;
  /* max-width: 1440px; */
  /* height: 100vh; */
  /* overflow: hidden;
  overflow-y: auto; */
`
// const BannerWrapper = styled(ColumnCenter)`
//   background-color: #3300ff;
//   height: 850px;
// `

const HomeAbout = styled.div`
  width: 100%;
  /* position: relative; */
  padding: 150px 0;
  /* background: ${({ theme }) => theme.white}; */
  background: url(${GlobalBg}) no-repeat;
  background-size: 214% 93%;
  background-position: center bottom;
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
      <SwiperWrapper>
        <SwiperPage />
      </SwiperWrapper>
      {/* <BannerWrapper></BannerWrapper> */}
      <HomeAbout>
        {/* <AbsImg src={GlobalBg} width="100%" height="80%" bottom="0" zIndex={0} /> */}

        <AbsImg src={Triangle03} width="50%" height="610" right="0" top="1050px" bottom="50%" zIndex={1} />
        <AbsImg src={Triangle02} width="32%" height="410" right="0" top="1050px" bottom="50%" zIndex={2} />
        <AbsImg src={Triangle01} width="15%" height="215" right="0" top="1050px" bottom="50%" zIndex={3} />
        <HomeAboutContent gap="90px">
          <TYPE.largeHeader fontSize={42} textAlign="center">
            HashPunk NFT is an experiment about web3
          </TYPE.largeHeader>

          <AutoColumn gap="lg">
            <TYPE.black fontSize={18}>INCLUDE</TYPE.black>
            <TYPE.black fontSize={18}>5000 UNIQUE</TYPE.black>
            <TYPE.black fontSize={18}>ON MATIC</TYPE.black>
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
                5,000 unique collectible characters with proof of ownership stored <br /> on the Matic blockchain. No
                two are exactly alike, and each one <br /> of them can be officially owned by a single person on
                the Matic <br /> blockchain.
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
          <TYPE.label fontSize={42} marginTop={-10} color="white">
            About <br /> Author
          </TYPE.label>
          <RowBetween marginTop={47} marginBottom={137}>
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
          </RowBetween>
        </HomeAboutContent>
        <Line />
        <HomeAboutContent>
          <RowBetween marginBottom={100} marginTop={85}>
            <TYPE.label fontSize={42} alignSelf="flex-start" color="white">
              About <br /> TEAM
            </TYPE.label>
            <AutoColumn gap="42px">
              <TYPE.label fontSize={18} color="white">
                This August, five friends launched the HashPunk, and they tried to <br /> build a new visual aesthetic.
              </TYPE.label>
              <AutoColumn gap="lg">
                <TYPE.label fontSize={18} color="white">
                  ◆ Mr. Q Li
                </TYPE.label>
                <TYPE.label fontSize={18} color="white">
                  ◆ Mr. Shaw_w
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
              </AutoColumn>
            </AutoColumn>
          </RowBetween>
          <Image src={Twitter} margin="0px auto 30px auto" />
          <Row justify="center">
            <Line width={90} />
            <Image src={Cat} width="47" height="40" marginX={50} />
            <Line width={90} />
          </Row>
        </HomeAboutContent>
      </HomeAbout>
    </HomeWrapper>
  )
}
