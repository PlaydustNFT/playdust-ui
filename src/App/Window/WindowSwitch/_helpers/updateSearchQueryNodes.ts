import SearchQueryNodeType from '../_types/SearchQueryNodeType';
import SearchQueryType from '../_types/SearchQueryType';

type SearchQueryNodes = SearchQueryType['nodes'];

const updateSearchQueryNodes = (
  nodes: SearchQueryNodes,
  updateNode: (node: SearchQueryNodeType) => SearchQueryNodeType | null
): SearchQueryNodes => {
  const updated = Object.values(nodes).reduce<SearchQueryNodes>((acc, curr) => {
    const updatedNode = updateNode(curr);

    if (updatedNode === null) {
      return acc;
    }

    return {
      ...acc,
      [updatedNode.id]: updatedNode,
    };
  }, {});

  return updated;
};

export default updateSearchQueryNodes;
