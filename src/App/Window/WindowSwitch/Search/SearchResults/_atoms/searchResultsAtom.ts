import { selector } from 'recoil';
import searchResultsBase from '../../_atoms/searchResultsBaseAtom';
import type SearchResponseType from '../../_types/SearchResponseType';
import searchResultsMore from './searchResultsMoreAtom';

const searchResultsAtom = selector<SearchResponseType>({
  key: 'searchResultsAtom',
  get: ({ get }) => {
    const base = get(searchResultsBase);
    const more = get(searchResultsMore);

    const result = more.reduce<SearchResponseType>(
      (acc, curr) => ({
        ...acc,
        page: Math.max(acc.page, curr.page),
        nfts: [...acc.nfts, ...curr.nfts],
      }),
      base
    );

    return result;
  },
});

export default searchResultsAtom;
