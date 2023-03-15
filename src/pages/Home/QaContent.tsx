import { useState } from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from 'components/Column'
import { ReactComponent as Add } from '../../assets/svg/add.svg'
import { TYPE } from 'theme'
import { Line } from 'pages/styled'
const QaLine = styled(Line)`
  // width: 245px;
  height: 1px;
  opacity: 0.3;
`
const Question = styled.div`
  width: 885px;
  position: relative;
  font-size: 16px;
  color: white;
  font-weight: 500;
`
const IconPosition = styled.span`
  position: absolute;
  right: 0;
  top: 0;
`
const CloseColor = styled(Add)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
  transform: rotate(45deg);
`
const OpenIcon = styled(Add)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`
function QaContent() {
  const [show, setShow] = useState<number>(1)
  const closeShow = () => {
    setShow(0)
  }
  const showAnswer = (v: number) => {
    const num = v + 1
    setShow(num)
  }
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
          No, Hashpunk NFT will be subject to whitelist restrictions, and users can only receive H value and
          <br /> NFT MINT with the unique wallet address of the HashkeyMe wallet.
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
  return (
    <AutoColumn gap="32px">
      <QaLine />
      {qAndA.map((item, index: number) => (
        <>
          <AutoColumn gap="16px" key={index}>
            <Question>
              {item.q}
              {show === index + 1 ? (
                <IconPosition onClick={closeShow}>
                  <CloseColor />
                </IconPosition>
              ) : (
                <IconPosition onClick={() => showAnswer(index)}>
                  <OpenIcon />
                </IconPosition>
              )}
            </Question>
            {show === index + 1 && (
              <TYPE.label fontSize={16} color="#9E9E9E" fontWeight="400">
                {item.a}
              </TYPE.label>
            )}
          </AutoColumn>
          <QaLine />
        </>
      ))}
    </AutoColumn>
  )
}
export default QaContent
