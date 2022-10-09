import { useRecoilValue } from 'recoil';
import shortId from '../../../../../_helpers/shortId';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryRootNodeAtom from '../../../_atoms/searchQueryRootNodeAtom';
import initializeSearchQuery from '../../../_helpers/initializeSearchQuery';
import makeUseChangeSearchQuery from '../../../_hooks/makeUseChangeSearchQuery';
import useGetAddQueryNode from '../../../_hooks/useGetAddQueryNode';
import type SearchSortType from '../../../_types/SearchSortType';
import TextQueryNodeType from '../../../_types/TextQueryNodeType';
import searchQueryTermAtom from '../_atoms/searchQueryTermAtom';

const useAddTextQueryNode = makeUseChangeSearchQuery(() => {
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const searchTerm = useRecoilValue(searchQueryTermAtom);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const getAddQueryNode = useGetAddQueryNode();
  const clearSearchQuery = useRecoilValue(clearSearchQueryAtom);

  return () => {
    const newNode: TextQueryNodeType = {
      id: shortId(),
      type: 'query',
      field: 'text',
      value: searchTerm,
    };
    const sort: SearchSortType = {
      field: 'relevance',
      direction: 'desc',
    };

    if (!rootNode || clearSearchQuery) {
      return {
        query: initializeSearchQuery(newNode),
        sort,
      };
    }

    if (activeNodeMeta && activeNodeMeta.type === 'group') {
      return getAddQueryNode(newNode, activeNodeMeta.nodeId);
    }
  };
});

export default useAddTextQueryNode;
