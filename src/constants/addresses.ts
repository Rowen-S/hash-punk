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
  ...constructSameAddressMap('0x3CB49528D7f141a329f0e259B5f6AE35f6cA70b7'),
  [SupportedChainId.GOERLI]: '0xAF6558076f6B1B212B77e93F3E9B15d6FC37a654',
  // [SupportedChainId.POLYGON]: '0x36011c438829c555aE20DBDcd55F65231b7327c2',
  [SupportedChainId.POLYGON]: '0xfCB6735e6ECE9fBC62e7264e884eCA044dF59824',
}

export const H_VALUW_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x49ACD631FB3BA458f43081D88F9A200db17244f5'),
  [SupportedChainId.GOERLI]: '0x2C875a911B1a258BAbDb64748686ee4a558a6376',
  // [SupportedChainId.POLYGON]: '0x73784424DeF5A5ac216cEA60F145a969856d5D3f',
  [SupportedChainId.POLYGON]: '0x5600e671E47E6702f41feCde030Df78ce3C0A600',
}
