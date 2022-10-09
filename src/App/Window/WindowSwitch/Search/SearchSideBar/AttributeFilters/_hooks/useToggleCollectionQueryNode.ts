import { useRecoilValue } from 'recoil';
import searchStateAtom from '../../../../_atoms/searchStateAtom';
import useAddCollectionQueryNode from '../../../../_hooks/useAddCollectionQueryNode';
import useRemoveQueryNode from '../../../../_hooks/useRemoveQueryNode';
import CollectionQueryNodeType from '../../../../_types/CollectionQueryNodeType';

const useToggleCollectionQueryNode = () => {
  const addCollectionQueryNode = useAddCollectionQueryNode();
  const removeQueryNode = useRemoveQueryNode();
  const { query } = useRecoilValue(searchStateAtom);

  return (collectionId: string) => {
    const collectionNode = Object.values(query.nodes).find((entry) => {
      if (CollectionQueryNodeType.is(entry) && entry.value === collectionId) {
        return true;
      }

      return false;
    });

    if (collectionNode) {
      return removeQueryNode(collectionNode.id);
    }

    return addCollectionQueryNode(collectionId, false, true);
  };
};

export default useToggleCollectionQueryNode;
