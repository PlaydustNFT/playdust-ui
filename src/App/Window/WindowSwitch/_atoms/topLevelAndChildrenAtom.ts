import { selector } from 'recoil';
import searchQueryRootNodeAtom from './searchQueryRootNodeAtom';

const topLevelAndChildrenAtom = selector<string[]>({
  key: 'topLevelAndChildrenAtom',
  get: ({ get }) => {
    const rootNode = get(searchQueryRootNodeAtom);
    const children =
      rootNode && rootNode.operator === 'and' ? rootNode.children : [];

    return children;
  },
});

export default topLevelAndChildrenAtom;
