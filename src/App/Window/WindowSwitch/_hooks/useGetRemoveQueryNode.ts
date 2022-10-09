import { useRecoilValue } from 'recoil';
import searchQueryParentIdMapAtom from '../_atoms/searchQueryParentIdMapAtom';
import searchStateAtom from '../_atoms/searchStateAtom';
import GroupNodeType from '../_types/GroupNodeType';
import SearchQueryType from '../_types/SearchQueryType';
import SearchStateType from '../_types/SearchStateType';
import useGetUpdateSearchQuery from './useGetUpdateSearchQuery';

type RemovalReturnType = Pick<SearchStateType, 'query'>;

function flattenNodes(nodes: SearchQueryType['nodes'], id: string): string[] {
  const node = nodes[id];

  if (node.type !== 'group') {
    return [node.id];
  }

  return [
    node.id,
    ...node.children.flatMap((childId) => flattenNodes(nodes, childId)),
  ];
}

const useGetRemoveQueryNode = () => {
  const searchState = useRecoilValue(searchStateAtom);
  const getUpdateSearchQuery = useGetUpdateSearchQuery();
  const parentMap = useRecoilValue(searchQueryParentIdMapAtom);

  const remove = (removalId: string, query: SearchQueryType) =>
    getUpdateSearchQuery(
      (node) => {
        if (node.id === removalId) {
          return null;
        }

        if (node.type === 'group' && node.children.includes(removalId)) {
          return {
            ...node,
            children: node.children.filter((child) => child !== removalId),
          };
        }

        return node;
      },
      [],
      query
    );

  return (removalIds: string | string[]): RemovalReturnType => {
    const ids = typeof removalIds === 'string' ? [removalIds] : removalIds;
    const expandedIds = ids.reduce<string[]>((acc, curr) => {
      const currNode = searchState.query.nodes[curr];

      if (GroupNodeType.is(currNode)) {
        return [...acc, ...flattenNodes(searchState.query.nodes, curr)];
      }

      return [...acc, curr];
    }, []);

    return expandedIds.reduce<RemovalReturnType>((acc, removalId) => {
      const parentId = parentMap[removalId];
      const parentNode = parentId && acc.query.nodes[parentId];
      const shouldRemoveGroup =
        parentNode &&
        parentNode.type === 'group' &&
        parentNode.children.length <= 1 &&
        removalIds.includes(removalId) &&
        searchState.query.nodes[removalId]?.type === 'query';
      const removed = remove(removalId, acc.query);

      if (shouldRemoveGroup) {
        return remove(parentId, removed.query);
      }

      return removed;
    }, searchState);
  };
};

export default useGetRemoveQueryNode;
