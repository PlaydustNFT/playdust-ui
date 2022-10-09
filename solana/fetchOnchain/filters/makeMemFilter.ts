import { GetProgramAccountsFilter, PublicKey } from '@solana/web3.js'
import bs58 from 'bs58'

interface MakeMemFilter {
  offset: number
  query?: string
  publicKey?: string
}

const getBytes = (query?: string, publicKey?: string) => {
  if (query) {
    return bs58.encode(Buffer.from(query))
  }

  if (publicKey) {
    const solPubKey = new PublicKey(publicKey)

    return solPubKey.toBase58()
  }

  throw Error('must provide query or publicKey')
}

const makeMemFilter = ({
  offset,
  query,
  publicKey,
}: MakeMemFilter): GetProgramAccountsFilter => {
  const bytes = getBytes(query, publicKey)

  return {
    memcmp: {
      offset,
      bytes,
    },
  }
}

export default makeMemFilter
