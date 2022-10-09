import {
  Connection,
  ParsedConfirmedTransaction,
  PublicKey,
  TransactionSignature,
} from '@solana/web3.js';
import SolanaClusterType from '../../../../../_types/SolanaClusterType';
import safePubkey from '../../../_helpers/safePubkey';
import TransactionType from '../_types/TransactionType';

async function fetchTransactionsForAddress(
  cluster: SolanaClusterType,
  pubkey: PublicKey,
  limit: number,
  before?: TransactionSignature
): Promise<TransactionType[]> {
  const connection = new Connection(cluster.endpoint);

  const signatureInfos = await connection.getConfirmedSignaturesForAddress2(
    safePubkey(pubkey),
    { limit, before }
  );
  const signatures = signatureInfos.map((info) => info.signature);
  const transactions: (ParsedConfirmedTransaction | null)[] =
    await connection.getParsedConfirmedTransactions(signatures);

  return signatureInfos.map((signatureInfo): TransactionType => {
    const parsedTransaction = transactions.find((transactionResponse) =>
      transactionResponse?.transaction?.signatures?.includes(
        signatureInfo.signature
      )
    );

    return {
      parsedTransaction: parsedTransaction ?? null,
      signatureInfo,
      signature: signatureInfo.signature,
    };
  });
}

export default fetchTransactionsForAddress;
