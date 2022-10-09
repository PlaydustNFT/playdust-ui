import { atom } from 'recoil';
import type SearchResponseType from '../../_types/SearchResponseType';

const searchResultsMoreAtom = atom<SearchResponseType[]>({
  key: 'searchResultsMoreAtom',
  default: [],
});

export default searchResultsMoreAtom;
