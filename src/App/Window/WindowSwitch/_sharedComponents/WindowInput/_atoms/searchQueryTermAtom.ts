import { atom } from 'recoil';

const searchQueryTermAtom = atom({
  key: 'searchQueryTermAtom',
  default: '',
});

export default searchQueryTermAtom;
