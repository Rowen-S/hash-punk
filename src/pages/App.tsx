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
import Lottery from './Lottery'
import Personal from './Personal'

import { ThemedBackground } from '../theme'
import { RedirectPathToHomeOnly } from './Home/redirects'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  height: 100%;
  overflow: hidden;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 120px 16px 0px 16px; */
  align-items: center;
  flex: 1;
  z-index: 1;

  /* ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 6rem 16px 16px 16px;
  `}; */
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
              <Route exact strict path="/home" component={Home} />
              <Route exact strict path="/lottery" component={Lottery} />
              <Route exact strict path="/personal" component={Personal} />
              <Route component={RedirectPathToHomeOnly} />
            </Switch>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
