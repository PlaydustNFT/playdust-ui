import { selector } from 'recoil';
import GroupNodeType from '../_types/GroupNodeType';
import searchStateAtom from './searchStateAtom';

const searchQueryRootNodeAtom = selector<GroupNodeType | null>({
  key: 'searchQueryRootNodeAtom',
  get: ({ get }) => {
    const { rootId, nodes } = get(searchStateAtom).query;

    if (Object.values(nodes).length === 0) {
      return null;
    }

    const rootNode = nodes[rootId];

    if (rootNode?.type !== 'group') {
      return null;
    }

    return rootNode;
  },
});
export default searchQueryRootNodeAtom;
