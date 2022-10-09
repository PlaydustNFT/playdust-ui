import { selector } from 'recoil';
import searchStateAtom from '../../../../_atoms/searchStateAtom';
import topLevelAndChildrenAtom from '../../../../_atoms/topLevelAndChildrenAtom';
import RangeQueryNodeType from '../../../../_types/RangeQueryNodeType';
import RangeValueUnionType from '../../../../_types/RangeValueUnionType';

const findTopLevelRangeQueryNodesAtom = selector<
  (value: RangeValueUnionType) => RangeQueryNodeType | undefined
>({
  key: 'findTopLevelRangeQueryNodesAtom',
  get: ({ get }) => {
    const { query } = get(searchStateAtom);
    const children = get(topLevelAndChildrenAtom);
    const topLevelRanges = children.reduce<RangeQueryNodeType[]>(
      (acc, curr) => {
        const node = query.nodes[curr];

        if (RangeQueryNodeType.is(node)) {
          return [...acc, node];
        }

        return acc;
      },
      []
    );

    return (value) => topLevelRanges.find((entry) => entry.value === value);
  },
});

export default findTopLevelRangeQueryNodesAtom;
