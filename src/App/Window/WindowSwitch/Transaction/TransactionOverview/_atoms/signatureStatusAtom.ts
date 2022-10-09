import { Connection, SignatureStatus } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import txStateAtom from '../../_atoms/txStateAtom';

const signatureStatusAtom = selector<SignatureStatus | null>({
  key: 'signatureStatusAtom',
  get: async ({ get }) => {
    const txState = get(txStateAtom);

    if (!txState) {
      return null;
    }

    const solanaCluster = get(solanaClusterAtom);

    const { state: signature } = txState;

    const connection = new Connection(solanaCluster.endpoint);

    const { value } = await connection.getSignatureStatus(signature, {
      searchTransactionHistory: true,
    });

    return value;
  },
});

export default signatureStatusAtom;
