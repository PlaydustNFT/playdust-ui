import { MetadataData } from '@metaplex-foundation/mpl-token-metadata'

export type MetaplexCollectionIdentifier = {
  symbol: string
  name?: string
  creator?: string
  updateAuthority?: string
  image?: string
}

export interface ParsedOnchain {
  mint: string
  pda: string
  onchain: MetadataData
}

export interface ParsedMetadata extends ParsedOnchain {
  rarityScore?: number
  statisticalRarity?: number
  offchain: {
    image: string
    attributes: {
      trait_type: string
      value: string
    }[]
  }
}
