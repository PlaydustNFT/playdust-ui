import { useRecoilValue } from 'recoil';
import searchStateAtom from '../_atoms/searchStateAtom';
import updateSearchQueryNodes from '../_helpers/updateSearchQueryNodes';
import SearchQueryNodeType from '../_types/SearchQueryNodeType';
import SearchQueryType from '../_types/SearchQueryType';
import SearchStateType from '../_types/SearchStateType';

const useGetUpdateSearchQuery = () => {
  const searchState = useRecoilValue(searchStateAtom);

  return (
    updateNode: (node: SearchQueryNodeType) => SearchQueryNodeType | null,
    nodeAdditions: SearchQueryNodeType | SearchQueryNodeType[] = [],
    uncommittedQuery?: SearchQueryType
  ): Pick<SearchStateType, 'query'> => {
    const query = uncommittedQuery || searchState.query;
    const additions = Array.isArray(nodeAdditions)
      ? nodeAdditions
      : [nodeAdditions];
    const addedQuery = additions.reduce<SearchQueryType>(
      (acc, curr) => ({
        ...acc,
        nodes: {
          ...acc.nodes,
          [curr.id]: curr,
        },
      }),
      query
    );

    const updated = {
      ...addedQuery,
      nodes: updateSearchQueryNodes(addedQuery.nodes, updateNode),
    };

    return { query: updated };
  };
};

export default useGetUpdateSearchQuery;
