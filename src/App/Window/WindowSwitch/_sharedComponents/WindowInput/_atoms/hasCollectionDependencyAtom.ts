import { selector } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import hasCollectionDependency from '../_helpers/hasCollectionDependency';

const hasCollectionDependencyAtom = selector<boolean>({
  key: 'hasCollectionDependencyAtom',
  get: ({ get }) => {
    const { query } = get(searchStateAtom);
    const activeNodeMeta = get(searchQueryActiveNodeMetaAtom);

    if (!activeNodeMeta) {
      return false;
    }

    return hasCollectionDependency(query, activeNodeMeta.nodeId);
  },
});

export default hasCollectionDependencyAtom;
