import { useRecoilValue } from 'recoil';
import shortId from '../../../_helpers/shortId';
import searchQueryRootNodeAtom from '../_atoms/searchQueryRootNodeAtom';
import searchStateAtom from '../_atoms/searchStateAtom';
import QueryNodeType from '../_types/QueryNodeType';
import SearchQueryType from '../_types/SearchQueryType';
import useGetAddQueryNode from './useGetAddQueryNode';

const useGetAddTopLevelQueryNode = () => {
  const { query } = useRecoilValue(searchStateAtom);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const getAddQueryNode = useGetAddQueryNode();

  return (newNode: QueryNodeType) => {
    if (rootNode) {
      if (rootNode.operator === 'and') {
        return getAddQueryNode(newNode, rootNode.id, rootNode.children.length);
      }

      const andWrapperId = shortId();

      const nextQuery: SearchQueryType = {
        rootId: andWrapperId,
        nodes: {
          [andWrapperId]: {
            id: andWrapperId,
            type: 'group',
            operator: 'and',
            children: [rootNode.id, newNode.id],
          },
          [newNode.id]: newNode,
          ...query.nodes,
        },
      };

      return { query: nextQuery };
    }
  };
};

export default useGetAddTopLevelQueryNode;
