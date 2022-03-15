export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,

  KOVAN = 42,
}

export const defaultChainId = SupportedChainId.RINKEBY

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly docs: string
  readonly explorer: string
  readonly label: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo } & {
  readonly [chainId in SupportedL1ChainId]: L1ChainInfo
}

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.MAINNET]: {
    docs: '',
    explorer: 'https://etherscan.io/',
    label: 'Mainnet',
  },
  [SupportedChainId.RINKEBY]: {
    docs: '',
    explorer: 'https://rinkeby.etherscan.io/',
    label: 'Rinkeby',
  },
  [SupportedChainId.ROPSTEN]: {
    docs: '',
    explorer: 'https://ropsten.etherscan.io/',
    label: 'Ropsten',
  },
  [SupportedChainId.GOERLI]: {
    docs: '',
    explorer: 'https://goerli.etherscan.io/',
    label: 'Görli',
  },
  [SupportedChainId.KOVAN]: {
    docs: '',
    explorer: 'https://kovan.etherscan.io/',
    label: 'Kovan',
  },
}
