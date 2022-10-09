import { selector } from 'recoil';
import { WindowUnionType } from '../../../../../_types/WindowUnionType';
import getWindowType from '../_helpers/getWindowType';
import searchQueryTermAtom from './searchQueryTermAtom';

const searchQueryTermWindowTypeAtom = selector<WindowUnionType>({
  key: 'searchQueryTermWindowTypeAtom',
  get: ({ get }) => {
    const term = get(searchQueryTermAtom);

    return getWindowType(term);
  },
});

export default searchQueryTermWindowTypeAtom;
