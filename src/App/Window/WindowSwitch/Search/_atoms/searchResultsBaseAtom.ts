import { selector } from 'recoil';
import searchStateSerializedAtom from '../../_atoms/searchStateSerializedAtom';
import fetchSearchResults from '../_helpers/fetchSearchResults';
import type SearchResponseType from '../_types/SearchResponseType';

const searchResultsBaseAtom = selector<SearchResponseType>({
  key: 'searchResultsBaseAtom',
  get: async ({ get }) => {
    const serialized = get(searchStateSerializedAtom);

    return fetchSearchResults(serialized, 0);
  },
});

export default searchResultsBaseAtom;
