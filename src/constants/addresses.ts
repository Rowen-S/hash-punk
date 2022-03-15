import { constructSameAddressMap } from '../utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
}

export const PANGA_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x7CcAd161335Aa709864f1F0d33C6d465486C4cD8'),
}
