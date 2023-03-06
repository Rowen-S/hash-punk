import { TYPE } from 'theme'
import styled from 'styled-components/macro'
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'

// import Swiper core and required modules
import SwiperCore, { FreeMode, Scrollbar, Autoplay } from 'swiper'

// Import Swiper styles
// import 'swiper/css'
// import 'swiper/css/free-mode'
// import 'swiper/css/scrollbar'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

// install Swiper modules
SwiperCore.use([Autoplay])

import Nft01 from 'assets/preview/001.png'
import Nft02 from 'assets/preview/002.png'
import Nft03 from 'assets/preview/003.png'
import Nft04 from 'assets/preview/004.png'
import Nft05 from 'assets/preview/005.png'

const Swipers = styled(Swiper)`
  width: 100%;
  padding: 11px;
  .swiper-wrapper {
    .swiper-slide {
      background-color: ${({ theme }) => theme.white};
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05), 0px 3px 9px 0px rgba(0, 0, 0, 0.16);
    }
  }
`

const SwiperBodyImg = styled.img`
  width: 100%;
  padding: 9px;
`

export default function SwiperPage() {
  const imgList = [
    { img: Nft01, tokenId: 1 },
    { img: Nft02, tokenId: 2 },
    { img: Nft03, tokenId: 3 },
    { img: Nft04, tokenId: 4 },
    { img: Nft05, tokenId: 5 },
  ]
  return (
    <Swipers
      slidesPerView={4.5}
      spaceBetween={20}
      freeMode={true}
      grabCursor={true}
      loop={true}
      autoplay={true}
      scrollbar={{ draggable: true, hide: true }}
      modules={[FreeMode, Scrollbar]}
    >
      {imgList.map((x) => (
        <SwiperSlide key={x.tokenId}>
          <SwiperBodyImg src={x.img} alt={'#' + x.tokenId} />
          <TYPE.black fontSize={18} paddingTop={145} paddingBottom={24} textAlign={'center'}>
            # {x.tokenId}
          </TYPE.black>
        </SwiperSlide>
      ))}
    </Swipers>
  )
}
