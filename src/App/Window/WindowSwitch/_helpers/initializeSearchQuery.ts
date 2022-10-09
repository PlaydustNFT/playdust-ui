import shortId from '../../../_helpers/shortId';
import type QueryNodeType from '../_types/QueryNodeType';
import type SearchQueryType from '../_types/SearchQueryType';

const initializeSearchQuery = (node: QueryNodeType): SearchQueryType => {
  const rootId = shortId();

  const nextQuery: SearchQueryType = {
    rootId,
    nodes: {
      [rootId]: {
        id: rootId,
        type: 'group',
        operator: 'and',
        children: [node.id],
      },
      [node.id]: node,
    },
  };

  return nextQuery;
};

export default initializeSearchQuery;
