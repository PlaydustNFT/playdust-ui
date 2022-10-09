import { Metadata } from '@metaplex-foundation/mpl-token-metadata'
import { Connection } from '@solana/web3.js'
import type SearchMetadata from '../SearchMetadataType'
import fetchOffchain from '../fetchOffchain'

const getMetadataByMintAddress = async (
  endpoint: string,
  mint: string
): Promise<SearchMetadata | undefined> => {
  try {
    const connection = new Connection(endpoint)
    const pda = await Metadata.getPDA(mint)
    const metadata = await Metadata.load(connection, pda)
    const offChainData = await fetchOffchain(metadata.data.data.uri)

    return {
      mint,
      data: metadata.data.data,
      offChainData,
    }
  } catch (e) {
    console.error(e)
  }
}

export default getMetadataByMintAddress
