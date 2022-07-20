export enum SupportedChainId {
  MAINNET = 1,
}

export const defaultChainId = SupportedChainId.MAINNET

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [SupportedChainId.MAINNET]

export const L1_CHAIN_IDS = [SupportedChainId.MAINNET] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly explorer: string
  readonly label: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo
}

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    explorer: 'https://etherscan.io/',
    label: 'Mainnet',
  },
}
