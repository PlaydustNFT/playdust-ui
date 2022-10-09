import { selector } from 'recoil';
import PlaydustMintAPIResponseType from '../_types/PlaydustMintAPIResponseType';
import addressStateAtom from './addressStateAtom';
import nftByMintAtom from './nftByMintAtom';

const playdustNftDataAtom = selector<PlaydustMintAPIResponseType | null>({
  key: 'playdustNftDataAtom',
  get: ({ get }) => {
    const addressState = get(addressStateAtom);

    if (!addressState) {
      return null;
    }

    return get(nftByMintAtom(addressState.pubkey.toString()));
  },
});

export default playdustNftDataAtom;
