import { Connection, TransactionResponse } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import txStateAtom from './txStateAtom';

const rawTransactionAtom = selector<TransactionResponse | null>({
  key: 'rawTransaction',
  get: async ({ get }) => {
    const txState = get(txStateAtom);
    const solanaCluster = get(solanaClusterAtom);

    if (!txState) {
      return null;
    }

    const { state: signature } = txState;

    const connection = new Connection(solanaCluster.endpoint);

    return connection.getTransaction(signature);
  },
});

export default rawTransactionAtom;
