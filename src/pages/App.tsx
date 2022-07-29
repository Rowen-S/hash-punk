import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'

import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
import Header from 'components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'

import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'

import Home from './Home'

import { ThemedBackground } from '../theme'
import { RedirectPathToHomeOnly } from './Home/redirects'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  min-height: 100vh;
  background-image: url('/config/images/bg.jpg');
  background-position: center;
  background-size: 100% 90%;
  background-repeat: no-repeat;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    background-size: cover;
  `};
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  width: 100%;
  align-items: center;
  flex: 1;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 6rem;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

function App() {
  return (
    <ErrorBoundary>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={ApeModeQueryParamReader} />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <ThemedBackground />
          <Popups />
          <Polling />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" component={Home} />
              <Route component={RedirectPathToHomeOnly} />
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
