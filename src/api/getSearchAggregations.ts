import { SearchRequest } from '@opensearch-project/opensearch/api/types';
import { boolean, create, optional, string, type } from 'superstruct';
import hasCollectionDependency from '../App/Window/WindowSwitch/_sharedComponents/WindowInput/_helpers/hasCollectionDependency';
import SearchAggResponseType from '../App/Window/WindowSwitch/_types/SearchAggResponseType';
import SearchQueryType from '../App/Window/WindowSwitch/_types/SearchQueryType';
import getAttributeAggQuery from './_helpers/getAttributeAggQuery';
import getNFTDependencyQueryById from './_helpers/getNFTDependencyQueryById';
import nextApiHandler from './_helpers/nextApiHandler';
import parseAttributeAggs from './_helpers/parseAttributeAggs';
import searchNFTs from './_helpers/searchNFTs';

const SearchSuggestionInputType = type({
  query: SearchQueryType,
  onlyListed: optional(boolean()),
  activeNodeId: string(),
});

const getSearchAggregations = nextApiHandler<SearchAggResponseType>(
  async (req) => {
    const { query, activeNodeId, onlyListed } = create(
      req.body,
      SearchSuggestionInputType
    );
    if (!hasCollectionDependency(query, activeNodeId)) {
      return [];
    }

    const suggestionNFTQuery = getNFTDependencyQueryById(query, activeNodeId);
    const activeNode = query.nodes[activeNodeId];
    const isAttributeNode =
      activeNode.type === 'query' && activeNode.field === 'attribute';

    const aggQuery = getAttributeAggQuery();
    const aggRequest: SearchRequest['body'] = {
      ...aggQuery,
      query: suggestionNFTQuery,
    };

    const [results] = await searchNFTs([
      {
        body: aggRequest,
        options: { onlyListed },
      },
    ]);
    const payload = parseAttributeAggs(results.aggregations);

    if (isAttributeNode) {
      return payload.filter((entry) => entry.key === activeNode.key);
    }

    return payload;
  }
);

export default getSearchAggregations;
