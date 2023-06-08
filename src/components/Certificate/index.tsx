import styled from 'styled-components/macro'
import { Text } from 'rebass'
import { Box } from 'rebass/styled-components'
const Certificate = styled.div<{
  bg: string
}>`
  position: relative;
  width: 384px;
  height: 132px;
  background-image: url(${({ bg }) => bg && bg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: ${({ color }) => color && color};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`
const TextBox = styled(Box)`
  position: absolute;
  top: 50%;
  right: 35px;
  transform: translate(0, -50%);
  ${({ theme }) => theme.mediaWidth.upToSmall`
    right: 0;
  `};
`
const Chinese = styled(Text)<{ color: string }>`
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 6px;
  color: ${({ color }) => color && color};
`
const English = styled(Text)<{ color: string }>`
  font-size: 12px;
  transform: scale(0.83, 0.83);
  transform-origin: 0 0;
  *font-size: 10px;
  font-family: HelveticaNeue;
  line-height: 12px;
  color: ${({ color }) => color && color};
`
export const CertificateCard = ({
  chinese,
  english,
  bg,
  color,
}: {
  chinese: string
  english: string
  bg: string
  color: string
}) => {
  return (
    <Certificate bg={bg}>
      <TextBox>
        <Chinese color={color}>{chinese}</Chinese>
        <English color={color}>{english}</English>
      </TextBox>
    </Certificate>
  )
}
