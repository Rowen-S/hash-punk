import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const PUNK_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x26a6517C13400c6a41129b8D080A7C8966F2fE0f'),
  [SupportedChainId.GOERLI]: '0x26a6517C13400c6a41129b8D080A7C8966F2fE0f',
}

export const H_VALUW_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0xC24fB47e9045f1bE47a2E65af0bcE270F8699cEc'),
  [SupportedChainId.GOERLI]: '0xC24fB47e9045f1bE47a2E65af0bcE270F8699cEc',
}
