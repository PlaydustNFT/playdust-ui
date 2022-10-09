import { atom } from 'recoil';

const connectedWalletAtom = atom<string | null>({
  key: 'connectedWalletAtom',
  default: null,
});

export default connectedWalletAtom;
