import { atom, selector } from 'recoil';
import type SearchStateType from '../_types/SearchStateType';
import searchState from './searchStateAtom';

const searchStateUncommittedAtom = atom<SearchStateType>({
  key: 'searchStateUncommittedAtom',
  default: selector({
    key: 'searchStateUncommitted/default',
    get: ({ get }) => get(searchState),
  }),
});

export default searchStateUncommittedAtom;
