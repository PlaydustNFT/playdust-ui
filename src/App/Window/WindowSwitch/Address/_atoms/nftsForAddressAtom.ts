import { selector } from 'recoil';
import frontendApi from '../../../_helpers/frontendApi';
import OpenSearchNFTSourceType from '../../_types/OpenSearchNFTSourceType';
import tokenAccountsForAddressAtom from './tokenAccountsForAddressAtom';

const nftsForAddressAtom = selector<OpenSearchNFTSourceType[]>({
  key: 'nftsForAddressAtom',
  get: async ({ get }) => {
    const tokens = get(tokenAccountsForAddressAtom);
    const mints = tokens.reduce<string[]>((acc, curr) => {
      const { tokenAmount, mint } = curr.data.info;

      if (tokenAmount.uiAmount === 1) {
        return [...acc, mint.toString()];
      }

      return acc;
    }, []);

    const { data } = await frontendApi.post<OpenSearchNFTSourceType[]>(
      '/mints',
      mints
    );

    return data;
  },
});

export default nftsForAddressAtom;
