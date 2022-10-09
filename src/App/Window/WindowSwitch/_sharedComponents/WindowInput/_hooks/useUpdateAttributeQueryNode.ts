import makeUseChangeSearchQuery from '../../../_hooks/makeUseChangeSearchQuery';
import useGetRemoveQueryNode from '../../../_hooks/useGetRemoveQueryNode';
import useGetUpdateSearchQuery from '../../../_hooks/useGetUpdateSearchQuery';

const useUpdateAttributeQueryNode = makeUseChangeSearchQuery(() => {
  const getRemoveQueryNode = useGetRemoveQueryNode();
  const getUpdateSearchQuery = useGetUpdateSearchQuery();

  return (id: string, value: string | null) => {
    if (value === null) {
      return getRemoveQueryNode(id);
    }

    return getUpdateSearchQuery((node) => {
      if (
        node.id === id &&
        node.type === 'query' &&
        node.field === 'attribute'
      ) {
        return {
          ...node,
          value,
        };
      }

      return node;
    });
  };
});

export default useUpdateAttributeQueryNode;
