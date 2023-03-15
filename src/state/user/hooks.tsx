import { Token } from '@uniswap/sdk-core'
import { SupportedLocale } from 'constants/locales'
import { useCallback, useMemo } from 'react'
// import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppState } from '../index'
import {
  removeSerializedToken,
  SerializedToken,
  updateArbitrumAlphaAcknowledged,
  updateHideClosedPositions,
  updateUserDarkMode,
  updateUserLocale,
  updateUserSingleHopOnly,
} from './actions'

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
}
export function useIsDarkMode(): boolean {
  // const { userDarkMode, matchesDarkMode } = useAppSelector(
  //   ({ user: { matchesDarkMode, userDarkMode } }) => ({
  //     userDarkMode,
  //     matchesDarkMode,
  //   }),
  //   shallowEqual
  // )

  // return userDarkMode === null ? matchesDarkMode : userDarkMode
  return false
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useAuthToken(): {
  token: string
  wallet: string | null
  lastUpdateTimestamp?: number | undefined
} {
  return useAppSelector((state) => state.user.userAuthToken)
}

export function useUserLocale(): SupportedLocale | null {
  return useAppSelector((state) => state.user.userLocale)
}

export function useUserLocaleManager(): [SupportedLocale | null, (newLocale: SupportedLocale) => void] {
  const dispatch = useAppDispatch()
  const locale = useUserLocale()

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale({ userLocale: newLocale }))
    },
    [dispatch]
  )

  return [locale, setLocale]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useAppDispatch()

  const singleHopOnly = useAppSelector((state) => state.user.userSingleHopOnly)

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch]
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useUserHideClosedPositions(): [boolean, (newHideClosedPositions: boolean) => void] {
  const dispatch = useAppDispatch()

  const hideClosedPositions = useAppSelector((state) => state.user.userHideClosedPositions)

  const setHideClosedPositions = useCallback(
    (newHideClosedPositions: boolean) => {
      dispatch(updateHideClosedPositions({ userHideClosedPositions: newHideClosedPositions }))
    },
    [dispatch]
  )

  return [hideClosedPositions, setHideClosedPositions]
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

export function useURLWarningVisible(): boolean {
  return useAppSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useArbitrumAlphaAlert(): [boolean, (arbitrumAlphaAcknowledged: boolean) => void] {
  const dispatch = useAppDispatch()
  const arbitrumAlphaAcknowledged = useAppSelector(({ user }) => user.arbitrumAlphaAcknowledged)
  const setArbitrumAlphaAcknowledged = (arbitrumAlphaAcknowledged: boolean) => {
    dispatch(updateArbitrumAlphaAcknowledged({ arbitrumAlphaAcknowledged }))
  }

  return [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged]
}
