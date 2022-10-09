import makeUseChangeSearchQuery from '../../../../../_hooks/makeUseChangeSearchQuery';
import useGetUpdateSearchQuery from '../../../../../_hooks/useGetUpdateSearchQuery';

const useToggleGroupOperator = makeUseChangeSearchQuery(() => {
  const getUpdateSearchQuery = useGetUpdateSearchQuery();

  return (groupNodeId: string) =>
    getUpdateSearchQuery((node) => {
      if (node.type === 'group' && node.id === groupNodeId) {
        return {
          ...node,
          operator: node.operator === 'and' ? 'or' : 'and',
        };
      }

      return node;
    });
});

export default useToggleGroupOperator;
