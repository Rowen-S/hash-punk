// import { darken } from 'polished'
// import { NavLink } from 'react-router-dom'
import { Text } from 'rebass'
// import { useDarkModeManager } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink } from '../../theme'
import { useETHBalances } from 'state/wallet/hooks'
import Row from 'components/Row'

// import Menu from '../Menu'
// import Row from '../Row'
import Web3Status from '../Web3Status'
import NetworkCard from './NetworkCard'

// import LogoPink from '../../assets/svg/logo_pink.png'
// import LogoDark from '../../assets/svg/logo_white.png'

import Twitter from '../../assets/svg/twitter.svg'
import Discord from '../../assets/svg/discord.svg'
import Opensea from '../../assets/svg/opensea.svg'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 330px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  /* box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.bg2}; */
  border-bottom: 2px solid transparent;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

// const HeaderLinks = styled(Row)`
//   justify-self: center;
//   background-color: ${({ theme }) => theme.bg0};
//   width: fit-content;
//   padding: 4px;
//   border-radius: 16px;
//   display: grid;
//   grid-auto-flow: column;
//   grid-gap: 10px;
//   overflow: auto;
//   align-items: center;
//   ${({ theme }) => theme.mediaWidth.upToLarge`
//     justify-self: start;
//     `};
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     justify-self: center;
//   `};
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     flex-direction: row;
//     justify-content: space-between;
//     justify-self: center;
//     z-index: 99;
//     position: fixed;
//     bottom: 0; right: 50%;
//     transform: translate(50%,-50%);
//     margin: 0 auto;
//     background-color: ${({ theme }) => theme.bg0};
//     border: 1px solid ${({ theme }) => theme.bg2};
//     box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
//   `};
// `

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg6)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

// const Title = styled.a`
//   display: flex;
//   align-items: center;
//   pointer-events: auto;
//   justify-self: flex-start;
//   margin-right: 12px;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     justify-self: center;
//   `};
//   :hover {
//     cursor: pointer;
//   }
// `

const HeaderLinks = styled(Row)`
  justify-self: flex-end;
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
`

// const activeClassName = 'ACTIVE'

// const StyledNavLink = styled(NavLink).attrs({
//   activeClassName,
// })`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme }) => theme.text2};
//   font-size: 1rem;
//   font-weight: 500;
//   padding: 8px 12px;
//   word-break: break-word;
//   overflow: hidden;
//   white-space: nowrap;
//   &.${activeClassName} {
//     border-radius: 12px;
//     font-weight: 600;
//     justify-content: center;
//     color: ${({ theme }) => theme.text1};
//     background-color: ${({ theme }) => theme.bg2};
//   }

//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//   }
// `

// const StyledExternalLink = styled(ExternalLink).attrs({
//   activeClassName,
// })<{ isActive?: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme }) => theme.text2};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: 500;

//   &.${activeClassName} {
//     border-radius: 12px;
//     font-weight: 600;
//     color: ${({ theme }) => theme.text1};
//   }

//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//     text-decoration: none;
//   }
// `

const LogoLink = styled(ExternalLink)`
  &:not(:first-child) {
    padding-left: 15px;
  }
`
const Logo = styled.img`
  width: 1.6875rem;
  height: 1.6875rem;
  &:hover {
    opacity: 0.4;
  }
`
export default function Header() {
  const { account } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // const [darkMode] = useDarkModeManager()

  return (
    <HeaderFrame>
      {/* <Title href=".">
        <img height={'44px'} src={darkMode ? LogoDark : LogoPink} alt="logo" />
      </Title> */}

      <HeaderLinks>
        <LogoLink href="https://twitter.com/panga3747">
          <Logo src={Twitter} alt="Twitter" />
        </LogoLink>
        <LogoLink href="https://discord.gg/pangazhijiao">
          <Logo src={Discord} alt="Discord" />
        </LogoLink>
        <LogoLink href="https://opensea.io/collection/pan-ga-zhi-jiao">
          <Logo src={Opensea} alt="Opensea" />
        </LogoLink>
      </HeaderLinks>
      <HeaderControls>
        <NetworkCard />
        <HeaderElement>
          <AccountElement active={!!account}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0, userSelect: 'none' }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(3)} ETH
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
