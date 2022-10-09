import { selector } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import SearchQueryNodeType from '../../../_types/SearchQueryNodeType';

const searchQueryActiveNodeAtom = selector<SearchQueryNodeType | null>({
  key: 'searchQueryActiveNodeAtom',
  get: ({ get }) => {
    const meta = get(searchQueryActiveNodeMetaAtom);

    if (!meta) {
      return null;
    }

    const { nodes } = get(searchStateAtom).query;

    return nodes[meta.nodeId];
  },
});

export default searchQueryActiveNodeAtom;
