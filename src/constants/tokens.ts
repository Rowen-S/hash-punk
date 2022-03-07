import { Token } from '@uniswap/sdk-core'
import { SupportedChainId } from './chains'

export const SOS = new Token(
  SupportedChainId.MAINNET,
  '0x3b484b82567a09e2588A13D54D032153f0c0aEe0',
  18,
  'SOS',
  'OpenDao SOS'
)
