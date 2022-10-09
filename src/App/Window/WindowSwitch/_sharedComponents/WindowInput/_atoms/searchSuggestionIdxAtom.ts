import { atom } from 'recoil';

const searchSuggestionIdxAtom = atom({
  key: 'searchSuggestionIdxAtom',
  default: 0,
});

export default searchSuggestionIdxAtom;
