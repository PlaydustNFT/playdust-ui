import { PublicKey } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../_atoms/solanaClusterAtom';
import windowStateAtom from '../../_atoms/windowStateAtom';
import addressLabel from '../_helpers/addressLabel';
import safePubkey from '../_helpers/safePubkey';
import AddressExplorerType from '../_types/AddressExplorerType';
import tokenRegistryAtom from './tokenRegistryAtom';

const addressStateAtom = selector<AddressExplorerType | null>({
  key: 'addressStateAtom',
  get: ({ get }) => {
    const windowState = get(windowStateAtom);

    const { type, state } = windowState;

    if (type !== 'address') {
      return null;
    }

    const pubkey = safePubkey(state);

    const solanaCluster = get(solanaClusterAtom);
    const tokenRegistry = get(tokenRegistryAtom);

    const label = addressLabel(state, solanaCluster.network, tokenRegistry);
    const hasPrivateKey = PublicKey.isOnCurve(pubkey.toBytes());

    return {
      type,
      state,
      pubkey,
      label,
      hasPrivateKey,
    };
  },
});

export default addressStateAtom;
