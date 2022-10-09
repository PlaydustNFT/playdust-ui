import { selector } from 'recoil';
import searchQueryParentIdMapAtom from './searchQueryParentIdMapAtom';
import secondLevelAttributeMapAtom from './secondLevelAttributeMapAtom';
import topLevelAttributesMapAtom from './topLevelAttributesMapAtom';

const findTopLevelAttributeKeyAtom = selector<
  (key: string) => {
    nodeId: string | null;
    groupId: string | null;
  }
>({
  key: 'findTopLevelAttributeKeyAtom',
  get: ({ get }) => {
    const parentMap = get(searchQueryParentIdMapAtom);
    const topLevelAttributes = get(topLevelAttributesMapAtom);
    const secondLevelAttributes = get(secondLevelAttributeMapAtom);

    return (key) => {
      const topLevelFound = topLevelAttributes[key];
      if (topLevelFound) {
        const valueKey = Object.keys(topLevelFound)[0];

        return {
          nodeId: topLevelFound[valueKey].id,
          groupId: null,
        };
      }

      const secondLevelFound = secondLevelAttributes[key];
      if (secondLevelFound) {
        const valueKey = Object.keys(secondLevelFound)[0];
        const node = secondLevelFound[valueKey];
        const groupId = parentMap[node.id];

        return {
          nodeId: node.id,
          groupId,
        };
      }

      return { nodeId: null, groupId: null };
    };
  },
});

export default findTopLevelAttributeKeyAtom;
