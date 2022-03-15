import { constructSameAddressMap } from '../utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
}

export const PANGA_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0xF3ac416803fa2c338F93aB292D1CF394F61A37f2'),
}
