import makeUseChangeSearchQuery from './makeUseChangeSearchQuery';
import useGetRemoveQueryNode from './useGetRemoveQueryNode';

const useRemoveQueryNode = makeUseChangeSearchQuery(() => {
  const getRemoveQueryNode = useGetRemoveQueryNode();

  return (removalId: string) => {
    const updated = getRemoveQueryNode(removalId);

    return updated;
  };
});

export default useRemoveQueryNode;
