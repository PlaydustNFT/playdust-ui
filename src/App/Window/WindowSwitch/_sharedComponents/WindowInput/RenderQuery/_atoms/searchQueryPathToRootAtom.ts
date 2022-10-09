import { selectorFamily } from 'recoil';
import searchQueryParentIdMapAtom from '../../../../_atoms/searchQueryParentIdMapAtom';

const searchQueryPathToRootAtom = selectorFamily<string[], string>({
  key: 'searchQueryPathToRootAtom',
  get:
    (nodeId) =>
    ({ get }) => {
      const parentMap = get(searchQueryParentIdMapAtom);

      const traverse = (id: string, list: string[]): string[] => {
        const parent = parentMap[id];

        if (!parent) {
          return [];
        }

        return [...list, parent, ...traverse(parent, list)];
      };

      return traverse(nodeId, []);
    },
});

export default searchQueryPathToRootAtom;
