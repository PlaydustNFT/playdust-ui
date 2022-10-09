import {
  Connection,
  SignatureResult,
  TransactionConfirmationStatus,
  TransactionSignature,
} from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import txStateAtom from '../../_atoms/txStateAtom';

type Confirmations = number | 'max';

type Timestamp = number | 'unavailable';

interface TransactionStatusInfo {
  slot: number;
  result: SignatureResult;
  timestamp: Timestamp;
  confirmations: Confirmations;
  confirmationStatus?: TransactionConfirmationStatus;
}

interface TransactionStatus {
  signature: TransactionSignature;
  info: TransactionStatusInfo | null;
}

async function fetchTransactionStatus(
  endpoint: string,
  signature: TransactionSignature
) {
  const connection = new Connection(endpoint);

  const { value } = await connection.getSignatureStatus(signature, {
    searchTransactionHistory: true,
  });

  let info = null;
  if (value !== null) {
    let confirmations: Confirmations;
    if (typeof value.confirmations === 'number') {
      confirmations = value.confirmations;
    } else {
      confirmations = 'max';
    }

    const blockTime = await connection.getBlockTime(value.slot);

    const timestamp: Timestamp = blockTime !== null ? blockTime : 'unavailable';

    info = {
      slot: value.slot,
      timestamp,
      confirmations,
      confirmationStatus: value.confirmationStatus,
      result: { err: value.err },
    };
  }

  return { signature, info };
}

const transactionStatusAtom = selector<TransactionStatus | null>({
  key: 'transactionStatus',
  get: async ({ get }) => {
    const txState = get(txStateAtom);
    const { endpoint } = get(solanaClusterAtom);

    if (!txState) {
      return null;
    }

    const { state: signature } = txState;

    return fetchTransactionStatus(endpoint, signature);
  },
});

export default transactionStatusAtom;
