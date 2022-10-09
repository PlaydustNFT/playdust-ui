import { atom } from 'recoil';
import SearchQueryActiveNodeType from '../_types/SearchActiveNodeMetaType';

const searchQueryActiveNodeMetaAtom = atom<SearchQueryActiveNodeType | null>({
  key: 'searchActiveNodeMetaAtom',
  default: null,
});

export default searchQueryActiveNodeMetaAtom;
