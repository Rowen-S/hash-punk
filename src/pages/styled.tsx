import { Box, Image } from 'rebass'
import styled, { keyframes } from 'styled-components/macro'
import { StyledInternalLink } from 'theme'

export const NoLiquidity = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`

export const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
export const ArrowWrapper = styled(StyledInternalLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
  color: ${({ theme }) => theme.text1};

  a {
    color: ${({ theme }) => theme.text1};
    text-decoration: none;
  }
  :hover {
    text-decoration: none;
  }
`

const loadingAnimation = keyframes`
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export const LoadingRows = styled.div<{ rowSize?: number; height?: string }>`
  margin: auto;
  display: grid;
  min-width: 100%;
  /* grid-column-gap: 0.5em;
  grid-row-gap: 0.8em; */
  grid-gap: 15px;
  grid-template-columns: repeat(${({ rowSize }) => (rowSize ? rowSize : 3)}, 1fr);
  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.bg1} 25%,
      ${({ theme }) => theme.bg3} 50%,
      ${({ theme }) => theme.bg1} 75%
    );
    background-size: 400%;
    border-radius: 12px;
    height: ${({ height }) => (height ? height : '12rem')};
    will-change: background-position;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-gap: 15px;
  `}
`

export const DetailLoadingRows = styled.div`
  display: grid;
  min-width: 75%;
  max-width: 960px;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.8em;
  grid-template-columns: repeat(2, 1fr);
  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.bg1} 25%,
      ${({ theme }) => theme.bg2} 50%,
      ${({ theme }) => theme.bg1} 75%
    );
    background-size: 400%;
    border-radius: 12px;
    height: 6em;
    will-change: background-position;
  }

  & > div:nth-child(4n + 1) {
    grid-column: 1 / 3;
  }
  & > div:nth-child(4n) {
    grid-column: 3 / 4;
    margin-bottom: 2em;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 100%;
    grid-template-columns: repeat(1, 1fr);
  `}
`

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

export const Line = styled(Box)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.white};
`

export const AbsImg = styled(Image)<{ left?: string; right?: string; top?: string; bottom?: string; zIndex?: number }>`
  position: absolute;
  left: ${({ left }) => left ?? 'unset'};
  right: ${({ right }) => right ?? 'unset'};
  top: ${({ top }) => top ?? 'unset'};
  bottom: ${({ bottom }) => bottom ?? 'unset'};
  z-index: ${({ zIndex }) => zIndex ?? 'unset'};
`
