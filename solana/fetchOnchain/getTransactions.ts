import { Connection, PublicKey, TransactionResponse } from '@solana/web3.js'

const getTransactions = async (
  endpoint: string,
  mint: string
): Promise<TransactionResponse[]> => {
  const connection = new Connection(endpoint)
  const raw = await connection.getSignaturesForAddress(new PublicKey(mint), {
    limit: 20,
  })

  return Promise.all(
    raw.map(async (m) => {
      const transaction = await connection.getTransaction(m.signature)
      if (!transaction) {
        return {} as TransactionResponse
      }
      return transaction
    })
  )
}

export default getTransactions
