import { selector } from 'recoil';
import searchQueryActiveNodeMetaAtom from './searchQueryActiveNodeMetaAtom';

const searchQueryActiveGroupIdxAtom = selector({
  key: 'searchQueryActiveGroupIdxAtom',
  get: ({ get }) => {
    const activeMeta = get(searchQueryActiveNodeMetaAtom);

    if (activeMeta?.type !== 'group') {
      return -1;
    }

    return activeMeta.index;
  },
});

export default searchQueryActiveGroupIdxAtom;
