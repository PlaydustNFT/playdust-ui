import byCollection from './byCollection'
import byMintAddress from './byMintAddress'
import byOwner from './byOwner'
import getTransactions from './getTransactions'

const fetchOnchain = {
  byCollection,
  byOwner,
  byMintAddress,
  getTransactions,
}

export default fetchOnchain
