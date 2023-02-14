export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  GOERLI = 5,
  KOVAN = 42,
}

export const defaultChainId = process.env.REACT_APP_DEFAULT_CHAIN

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
] as const

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

  [SupportedChainId.ROPSTEN]: {
    explorer: 'https://ropsten.etherscan.io/',
    label: 'Ropsten',
  },
  [SupportedChainId.GOERLI]: {
    explorer: 'https://goerli.etherscan.io/',
    label: 'Görli',
  },
  [SupportedChainId.KOVAN]: {
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
  },
}
