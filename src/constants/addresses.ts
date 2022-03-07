import { constructSameAddressMap } from '../utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
}

export const CHERRY_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x000000059619cdddc056910672abc90887136a95'),
}
