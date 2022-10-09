import { selector } from 'recoil';
import serializeSearch from '../_helpers/serializeSearch';
import searchStateAtom from './searchStateAtom';

const searchStateSerializedAtom = selector({
  key: 'searchStateSerializedAtom',
  get: ({ get }) => {
    const searchState = get(searchStateAtom);

    return serializeSearch(searchState);
  },
});

export default searchStateSerializedAtom;
