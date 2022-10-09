import { atom } from 'recoil';

const searchQueryDebouncedTermAtom = atom({
  key: 'searchQueryDebouncedTermAtom',
  default: '',
});

export default searchQueryDebouncedTermAtom;
