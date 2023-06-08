import { ReactNode, useState } from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from 'components/Column'
import { ReactComponent as Add } from '../../assets/svg/add.svg'
import { TYPE } from 'theme'
import { Line } from 'pages/styled'
import { animated, useSpring } from 'react-spring'
import usePrevious from 'hooks/usePrevious'
import Row from 'components/Row'

const QaContentWrapper = styled(AutoColumn)`
  width: fit-content;
`

const QaLine = styled(Line)`
  height: 1px;
  opacity: 0.3;
`
const FaqHeaderIcon = styled(Add)<{ open: boolean }>`
  transform: rotate(${({ open }) => (open ? '45deg' : '0deg')});
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const FaqHeader = styled(Row)`
  cursor: pointer;
  justify-content: space-between;
  & > div {
    max-width: 90%;
  }
`

const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  overflow: hidden;
`

const qAndA = [
  {
    q: `1. Can I log in to the official website to run Mint under any network environment?`,
    a: (
      <>
        No, all our activities belong to the company&apos;s internal stuff benefit plan. Currently, all
        <br /> login environments are only supported in the company&lsquo;s office network environment.
      </>
    ),
  },
  {
    q: `2. Do i use another wallet address to Mint?`,
    a: (
      <>
        Hashpunk NFTs will be subject to whitelist restrictions, meaning that users can only receive H value and
        <br /> NFT MINT using the unique wallet address of the HashkeyMe wallet or wallets that support the
        WalletConnect protocol.
      </>
    ),
  },
  {
    q: `3. Where will Hashpunk be stored?`,
    a: (
      <>
        All PFPs that successfully used H value or LuckyPass Mint will be stored in the corresponding
        <br /> Hashkey Me wallet address. Due to transmission speed, there may be a slight delay.
      </>
    ),
  },
  {
    q: `4. What can I benefit after Mint to Hashpunk?`,
    a: (
      <>
        Hashpunk NFT is divided into two types, common and scarce.
        <br /> The basic benefits of the two types of NFTs are 1-day H vacation, among which scarce NFTs can enjoy
        <br /> additional exchange rights: then scarce NFTs and H vacation exchange coupons can get 70 H values.
      </>
    ),
  },
  {
    q: `5. Is PFP still available after redeeming H Vacation?`,
    a: (
      <>
        Yes, To redeem the H vacation, you only need to burn the exclusive H vacation coupon (turn gray),
        <br /> and the ownership of the avatar after the successful exchange still belongs to the user.
      </>
    ),
  },
  {
    q: `6. Can the H value be transferred?`,
    a: (
      <>
        Yes. In order to increase the fun of playing H value, the H value type is a transferable
        <br /> ERC-1155 type, and users can transfer according to their own needs.
      </>
    ),
  },
  {
    q: `7. Do I need to charge the fee for MintNFT?`,
    a: (
      <>
        No, every wallet address registered to the functional department will receive 0.1matic as
        <br /> Gas Fee (only for the first time)
      </>
    ),
  },
]

export default function QaContent() {
  const [{ isOpen, sIndex }, setIsOpen] = useState<{ isOpen: boolean; sIndex: number }>({ isOpen: false, sIndex: -1 })
  return (
    <QaContentWrapper gap="32px">
      <QaLine />
      {qAndA.map((item, index) => (
        <AutoColumn gap="16px" key={index}>
          <FaqHeader
            onClick={() => {
              if (isOpen && index !== sIndex) {
                setIsOpen({ isOpen: true, sIndex: index })
              } else {
                setIsOpen({ isOpen: !isOpen, sIndex: index })
              }
            }}
          >
            <TYPE.white>{item.q}</TYPE.white>
            <FaqHeaderIcon open={isOpen && sIndex == index} />
          </FaqHeader>
          <FaqItem isOpen={isOpen && sIndex == index}>{item.a}</FaqItem>
          <QaLine />
        </AutoColumn>
      ))}
    </QaContentWrapper>
  )
}

const FaqItem = ({ isOpen, children }: { isOpen: boolean; children: ReactNode }) => {
  const previous = usePrevious(isOpen)
  // @ts-ignore
  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0,
    },
  })
  return (
    <Content
      style={{
        opacity,
        height: isOpen && previous === isOpen ? 'auto' : height,
      }}
    >
      <TYPE.label fontSize={16} color="#9E9E9E" fontWeight="400">
        {children}
      </TYPE.label>
    </Content>
  )
}
