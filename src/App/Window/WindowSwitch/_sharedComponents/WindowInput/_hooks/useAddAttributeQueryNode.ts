import { useRecoilValue } from 'recoil';
import shortId from '../../../../../_helpers/shortId';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import makeUseChangeSearchQuery from '../../../_hooks/makeUseChangeSearchQuery';
import useGetAddQueryNode from '../../../_hooks/useGetAddQueryNode';
import AttributeQueryNodeType from '../../../_types/AttributeQueryNodeType';

const useAddAttributeQueryNode = makeUseChangeSearchQuery(() => {
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const getAddQueryNode = useGetAddQueryNode();

  return (key: string, value: string) => {
    if (activeNodeMeta) {
      const queryAddition: AttributeQueryNodeType = {
        id: shortId(),
        type: 'query',
        field: 'attribute',
        value,
        key,
      };
      const parentId = activeNodeMeta.nodeId;

      return getAddQueryNode(queryAddition, parentId);
    }
  };
});

export default useAddAttributeQueryNode;
