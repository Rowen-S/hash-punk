export interface TokenIpfsJson {
  name: string
  description: string
  image: string
  edition: number
  attributes: {
    trait_type: string
    value: string
  }[]
}
