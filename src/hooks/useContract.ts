import { Contract } from '@ethersproject/contracts'
import { getContract } from 'utils'
import { useActiveWeb3React } from './web3'

import { abi as MulticallABI } from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'

import PANGA_ABI from 'abis/panga.json'

import { MULTICALL_ADDRESS, PANGA_ADDRESS } from 'constants/addresses'

import { UniswapInterfaceMulticall } from 'types/v3'
import { Panga } from '../abis/types'

import { useMemo } from 'react'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useMulticall2Contract() {
  return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI, false) as UniswapInterfaceMulticall
}

export function usePangaContract() {
  return useContract<Panga>(PANGA_ADDRESS, PANGA_ABI, true) as Panga
}
