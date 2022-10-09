import { useRecoilValue } from 'recoil';
import searchQueryActiveGroupIdxAtom from '../_atoms/searchQueryActiveGroupIdxAtom';
import searchStateAtom from '../_atoms/searchStateAtom';
import insertAtIdx from '../_helpers/insertAtIdx';
import GroupNodeType from '../_types/GroupNodeType';
import SearchQueryNodeType from '../_types/SearchQueryNodeType';
import SearchStateType from '../_types/SearchStateType';
import useGetUpdateSearchQuery from './useGetUpdateSearchQuery';

const useGetAddQueryNode = () => {
  const { query } = useRecoilValue(searchStateAtom);
  const activeGroupIdx = useRecoilValue(searchQueryActiveGroupIdxAtom);
  const getUpdateSearchQuery = useGetUpdateSearchQuery();

  const getDefaultIdx = (parentId: string) => {
    if (activeGroupIdx !== -1) {
      return activeGroupIdx;
    }

    return GroupNodeType.create(query.nodes[parentId]).children.length;
  };

  return (
    nodeAddition: SearchQueryNodeType,
    parentId: string,
    index?: number
  ): Pick<SearchStateType, 'query'> => {
    const defaultedIdx = index || getDefaultIdx(parentId);
    const updated = getUpdateSearchQuery((node) => {
      if (node.id === parentId && node.type === 'group') {
        return {
          ...node,
          children: insertAtIdx(node.children, nodeAddition.id, defaultedIdx),
        };
      }

      return node;
    }, nodeAddition);

    return updated;
  };
};

export default useGetAddQueryNode;
