import { atom } from 'recoil';

const searchSuggestionsForcedClosedAtom = atom<boolean>({
  key: 'searchSuggestionsForcedClosedAtom',
  default: false,
});

export default searchSuggestionsForcedClosedAtom;
