import { Connection, StakeActivationData } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../../_atoms/addressStateAtom';

const stakeActivationAtom = selector<StakeActivationData | null>({
  key: 'stakeActivation',
  get: async ({ get }) => {
    const addressState = get(addressStateAtom);

    if (!addressState) {
      return null;
    }

    const { pubkey } = addressState;

    const { endpoint } = get(solanaClusterAtom);

    const connection = new Connection(endpoint, 'confirmed');

    return connection.getStakeActivation(pubkey);
  },
});

export default stakeActivationAtom;
