export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  GOERLI = 5,
  KOVAN = 42,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
}

export const defaultChainId = process.env.REACT_APP_DEFAULT_CHAIN

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
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
  [SupportedChainId.POLYGON]: {
    explorer: 'https://polygonscan.com/',
    label: 'Polygon',
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    explorer: 'https://mumbai.polygonscan.com/',
    label: 'Polygon_mumbai',
  },
}
