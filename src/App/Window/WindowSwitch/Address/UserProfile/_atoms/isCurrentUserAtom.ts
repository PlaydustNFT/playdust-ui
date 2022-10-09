import { selector } from 'recoil';
import connectedWalletAtom from '../../../../../_atoms/connectedWalletAtom';
import addressStateAtom from '../../../_atoms/addressStateAtom';

const isCurrentUserAtom = selector<boolean>({
  key: 'isCurrentUserAtom',
  get: ({ get }) => {
    const addressState = get(addressStateAtom);
    const connectedWallet = get(connectedWalletAtom);

    if (addressState && connectedWallet) {
      return addressState.pubkey.toString() === connectedWallet;
    }

    return false;
  },
});

export default isCurrentUserAtom;
