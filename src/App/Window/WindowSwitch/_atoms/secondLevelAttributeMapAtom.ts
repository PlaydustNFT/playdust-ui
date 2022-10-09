import { selector } from 'recoil';
import { array } from 'superstruct';
import AttributeQueryMapType from '../_types/AttributeQueryMapType';
import AttributeQueryNodeType from '../_types/AttributeQueryNodeType';
import GroupNodeType from '../_types/GroupNodeType';
import searchStateAtom from './searchStateAtom';
import topLevelAndChildrenAtom from './topLevelAndChildrenAtom';

const secondLevelAttributeMapAtom = selector<AttributeQueryMapType>({
  key: 'secondLevelAttributeMapAtom',
  get: ({ get }) => {
    const { query } = get(searchStateAtom);
    const children = get(topLevelAndChildrenAtom);
    const secondLevelAttributes = children.reduce<AttributeQueryMapType>(
      (acc, curr) => {
        const node = query.nodes[curr];

        if (GroupNodeType.is(node) && node.operator === 'or') {
          const directOrChildren = node.children.map(
            (childId) => query.nodes[childId]
          );
          const haveSameAttribute = directOrChildren.every((childNode, idx) => {
            if (!AttributeQueryNodeType.is(childNode)) {
              return false;
            }

            if (idx === 0) {
              return true;
            }

            return (
              AttributeQueryNodeType.is(directOrChildren[0]) &&
              directOrChildren[0].key === childNode.key
            );
          });

          if (
            directOrChildren.length > 0 &&
            haveSameAttribute &&
            array(AttributeQueryNodeType).is(directOrChildren)
          ) {
            const attributeKey = directOrChildren[0].key;
            const attributeValueObject = directOrChildren.reduce(
              (yAcc, yCurr) => ({
                ...yAcc,
                [yCurr.value]: yCurr,
              }),
              {}
            );

            return {
              ...acc,
              [attributeKey]: {
                ...acc[attributeKey],
                ...attributeValueObject,
              },
            };
          }
        }

        return acc;
      },
      {}
    );

    return secondLevelAttributes;
  },
});

export default secondLevelAttributeMapAtom;
