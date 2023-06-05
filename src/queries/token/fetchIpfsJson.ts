import { TokenIpfsJson } from 'queries/types'

export const fetchIpfsJson = async ({ jsonUri }: { jsonUri: string }): Promise<TokenIpfsJson> => {
  const r = await fetch(jsonUri)

  const data = await r.json()

  return data
}
