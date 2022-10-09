import { selector } from 'recoil';
import AttributeQueryMapType from '../_types/AttributeQueryMapType';
import AttributeQueryNodeType from '../_types/AttributeQueryNodeType';
import searchStateAtom from './searchStateAtom';
import topLevelAndChildrenAtom from './topLevelAndChildrenAtom';

const topLevelAttributesMapAtom = selector<AttributeQueryMapType>({
  key: 'topLevelAttributesMapAtom',
  get: ({ get }) => {
    const { query } = get(searchStateAtom);
    const children = get(topLevelAndChildrenAtom);

    const topLevelAttributes = children.reduce<AttributeQueryMapType>(
      (acc, curr) => {
        const node = query.nodes[curr];

        if (AttributeQueryNodeType.is(node)) {
          return {
            ...acc,
            [node.key]: {
              ...(acc[node.key] || {}),
              [node.value]: node,
            },
          };
        }

        return acc;
      },
      {}
    );

    return topLevelAttributes;
  },
});

export default topLevelAttributesMapAtom;
