import { darken } from 'polished'
import useScrollPosition from '@react-hook/window-scroll'
import { NavLink } from 'react-router-dom'
import { Text } from 'rebass'
import { useDarkModeManager } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from 'state/wallet/hooks'
import Row, { RowFixed } from 'components/Row'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg'

// import Menu from '../Menu'
// import Row from '../Row'
import Web3Status from '../Web3Status'
import NetworkCard from './NetworkCard'

// import Twitter from '../../assets/svg/twitter.svg'
import useTheme from 'hooks/useTheme'
import { getChainInfoOrDefault } from 'constants/chains'
import { isProductionEnv, isStagingEnv } from 'utils/env'
// import Menu from 'components/Menu'

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
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
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 120px 1fr;

  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`

// const HeaderElementWrap = styled.div`
//   display: flex;
//   align-items: center;
// `

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* todo */
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : '')};
  border-radius: 6px;
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

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const DashBoardIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }

  position: relative;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg2};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

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

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const [darkMode] = useDarkModeManager()

  const scrollY = useScrollPosition()

  const { white, black } = useTheme()

  const info = getChainInfoOrDefault(chainId)

  console.log(
    'env test /n',
    'isProductionEnv:',
    isProductionEnv(),
    'isStagingEnv:',
    isStagingEnv(),
    process.env.NODE_ENV,
    typeof process.env.REACT_APP_STAGING
  )

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <HeaderRow>
        <Title href=".">
          <DashBoardIcon>
            <Logo fill={darkMode ? white : black} width="100%" height="44px" title="logo" />
          </DashBoardIcon>
        </Title>
      </HeaderRow>

      <HeaderLinks>
        <StyledNavLink id={`home-nav-link`} to={'/home'}>
          Home
        </StyledNavLink>
        <StyledNavLink id={`lottery-nav-link`} to={'/lottery'}>
          Lottery
        </StyledNavLink>
        {account && (
          <StyledNavLink id={`personal-nav-link`} to={'/personal'}>
            Benefit
          </StyledNavLink>
        )}
      </HeaderLinks>
      <HeaderControls>
        <NetworkCard />
        <HeaderElement>
          <AccountElement active={!!account}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0, userSelect: 'none' }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(3)} {info?.nativeCurrency?.symbol}
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        {/* <HeaderElementWrap>
          <Menu />
        </HeaderElementWrap> */}
      </HeaderControls>
    </HeaderFrame>
  )
}
