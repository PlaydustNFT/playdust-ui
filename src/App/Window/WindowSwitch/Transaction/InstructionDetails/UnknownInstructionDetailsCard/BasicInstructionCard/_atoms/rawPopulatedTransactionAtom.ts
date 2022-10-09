import { Connection, Message, Transaction } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../../../../_atoms/solanaClusterAtom';
import txStateAtom from '../../../../_atoms/txStateAtom';

interface Details {
  transaction: Transaction;
  message: Message;
  signatures: string[];
}

const rawPopulatedTransactionAtom = selector<Details | null>({
  key: 'rawPopulatedTransaction',
  get: async ({ get }) => {
    const txState = get(txStateAtom);

    if (!txState) {
      return null;
    }

    const { state: signature } = txState;

    const { endpoint } = get(solanaClusterAtom);
    const connection = new Connection(endpoint);

    const response = await connection.getTransaction(signature);

    if (!response) {
      return null;
    }

    const {
      transaction: { message, signatures },
    } = response;

    return {
      message,
      signatures,
      transaction: Transaction.populate(message, signatures),
    };
  },
});

export default rawPopulatedTransactionAtom;
