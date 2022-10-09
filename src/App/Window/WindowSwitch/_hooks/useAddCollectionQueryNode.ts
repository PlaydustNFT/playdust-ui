import { useRecoilValue } from 'recoil';
import shortId from '../../../_helpers/shortId';
import clearSearchQueryAtom from '../_atoms/clearSearchQueryAtom';
import searchQueryActiveNodeMetaAtom from '../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryRootNodeAtom from '../_atoms/searchQueryRootNodeAtom';
import initializeSearchQuery from '../_helpers/initializeSearchQuery';
import CollectionQueryNodeType from '../_types/CollectionQueryNodeType';
import makeUseChangeSearchQuery from './makeUseChangeSearchQuery';
import useGetAddQueryNode from './useGetAddQueryNode';

const useAddCollectionQueryNode = makeUseChangeSearchQuery(() => {
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const getAddQueryNode = useGetAddQueryNode();
  const clearSearchQuery = useRecoilValue(clearSearchQueryAtom);

  return (collectionId: string, initialize?: boolean, atRootNode?: boolean) => {
    const newNode: CollectionQueryNodeType = {
      id: shortId(),
      type: 'query',
      field: 'collection',
      value: collectionId,
    };

    if (!rootNode || initialize || clearSearchQuery) {
      const nextQuery = initializeSearchQuery(newNode);
      return { query: nextQuery };
    }

    if (atRootNode) {
      return getAddQueryNode(newNode, rootNode.id);
    }

    if (activeNodeMeta?.type === 'group') {
      return getAddQueryNode(newNode, activeNodeMeta.nodeId);
    }
  };
});

export default useAddCollectionQueryNode;
