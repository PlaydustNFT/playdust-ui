import { atom } from 'recoil';

const clearSearchQueryAtom = atom({
  key: 'clearSearchQueryAtom',
  default: false,
});

export default clearSearchQueryAtom;
