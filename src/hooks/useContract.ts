import { Contract } from '@ethersproject/contracts'
import { getContract } from 'utils'
import { useActiveWeb3React } from './web3'

import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import PUNK_MINT_ABI from 'abis/hash-punk.json'
import H_VALUE_ABI from 'abis/h-value.json'
import MulticallABI from 'abis/UniswapInterfaceMulticall.json'

import { MULTICALL_ADDRESS, ENS_REGISTRAR_ADDRESSES, PUNK_ADDRESS, H_VALUW_ADDRESS } from 'constants/addresses'

import { EnsPublicResolver, EnsRegistrar, HashPunk, HValue, UniswapInterfaceMulticall } from '../abis/types'

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

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useHashPunkContract() {
  return useContract<HashPunk>(PUNK_ADDRESS, PUNK_MINT_ABI, true) as HashPunk
}
export function useHVlaueContract() {
  return useContract<HValue>(H_VALUW_ADDRESS, H_VALUE_ABI, true) as HValue
}
