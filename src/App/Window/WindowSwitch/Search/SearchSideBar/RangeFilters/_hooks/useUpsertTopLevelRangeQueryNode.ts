import { useRecoilValue } from 'recoil';
import shortId from '../../../../../../_helpers/shortId';
import makeUseChangeSearchQuery from '../../../../_hooks/makeUseChangeSearchQuery';
import useGetAddTopLevelQueryNode from '../../../../_hooks/useGetAddTopLevelQueryNode';
import useGetUpdateSearchQuery from '../../../../_hooks/useGetUpdateSearchQuery';
import RangeQueryNodeType from '../../../../_types/RangeQueryNodeType';
import RangeValueUnionType from '../../../../_types/RangeValueUnionType';
import findTopLevelRangeQueryNodesAtom from '../_atoms/findTopLevelRangeQueryNodesAtom';

const useUpsertTopLevelRangeQueryNode = makeUseChangeSearchQuery(() => {
  const addTopLevelQueryNode = useGetAddTopLevelQueryNode();
  const findRange = useRecoilValue(findTopLevelRangeQueryNodesAtom);
  const updateSearchQuery = useGetUpdateSearchQuery();

  return (
    value: RangeValueUnionType,
    min: number | undefined,
    max: number | undefined
  ) => {
    const found = findRange(value);

    if (found) {
      return updateSearchQuery((node) => {
        if (node.id === found.id && RangeQueryNodeType.is(node)) {
          return {
            ...found,
            min,
            max,
          };
        }

        return node;
      });
    }

    const newNode: RangeQueryNodeType = {
      id: shortId(),
      type: 'query',
      field: 'range',
      value,
      min,
      max,
    };

    return addTopLevelQueryNode(newNode);
  };
});

export default useUpsertTopLevelRangeQueryNode;
