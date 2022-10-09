import { selector } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryActiveNodeAtom from './searchQueryActiveNodeAtom';

const searchQuerySelectedNodesAtom = selector<string[]>({
  key: 'searchQuerySelectedNodesAtom',
  get: ({ get }) => {
    const activeNode = get(searchQueryActiveNodeAtom);
    const activeNodeMeta = get(searchQueryActiveNodeMetaAtom);

    if (
      !(
        activeNode?.type === 'group' &&
        activeNodeMeta?.type === 'group' &&
        activeNodeMeta.endIndex !== undefined
      )
    ) {
      return [];
    }

    const { index, endIndex } = activeNodeMeta;
    const range: [number, number] = [
      Math.min(index, endIndex),
      Math.max(index, endIndex),
    ];

    return activeNode.children.slice(range[0], range[1]);
  },
});

export default searchQuerySelectedNodesAtom;
