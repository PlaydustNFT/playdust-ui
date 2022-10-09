import { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';
import SearchQueryType from '../../App/Window/WindowSwitch/_types/SearchQueryType';
import createSingleNFTQuery from './createSingleNFTQuery';

const getNFTQueryById = (
  query: SearchQueryType,
  currId: string
): QueryDslQueryContainer => {
  const currNode = query.nodes[currId];

  if (currNode.type === 'group') {
    const childrenQueries = currNode.children
      .filter((entry) => {
        const childNode = query.nodes[entry];
        const isEmptyGroup =
          childNode.type === 'group' && childNode.children.length === 0;

        return !isEmptyGroup;
      })
      .map((entry) => getNFTQueryById(query, entry));

    const bool =
      currNode.operator === 'and'
        ? {
            must: childrenQueries,
          }
        : {
            should: childrenQueries,
            minimum_should_match: 1,
          };

    return {
      bool,
    };
  }

  return createSingleNFTQuery(currNode);
};

export default getNFTQueryById;
