import {
  QueryDslQueryContainer,
  SearchRequest,
} from '@opensearch-project/opensearch/api/types';
import { array, number, string, type } from 'superstruct';
import GroupNodeType from '../App/Window/WindowSwitch/_types/GroupNodeType';
import SearchStateType from '../App/Window/WindowSwitch/_types/SearchStateType';
import SearchTopAggResponseType from '../App/Window/WindowSwitch/_types/SearchTopAggResponseType';
import getAttributeAggQuery from './_helpers/getAttributeAggQuery';
import getNFTDependencyQueryById from './_helpers/getNFTDependencyQueryById';
import getNFTQueryById from './_helpers/getNFTQueryById';
import nextApiHandler from './_helpers/nextApiHandler';
import parseAttributeAggs from './_helpers/parseAttributeAggs';
import searchNFTs from './_helpers/searchNFTs';

const PrimaryCollectionAgg = type({
  primaryCollection: type({
    buckets: array(
      type({
        key: type({
          id: string(),
          name: string(),
        }),
        doc_count: number(),
      })
    ),
  }),
});

const getCollectionAggs = async ({
  query,
  sort,
  onlyListed,
}: SearchStateType): Promise<SearchTopAggResponseType['collections']> => {
  const collectionAggQuery: SearchRequest['body'] = {
    size: 0,
    query: getNFTQueryById(query, query.rootId),
    aggs: {
      primaryCollection: {
        composite: {
          sources: [
            {
              id: {
                terms: {
                  field: 'primaryCollection',
                },
              },
            },
            {
              name: {
                terms: {
                  field: 'collectionName.keyword',
                },
              },
            },
          ],
          size: 20,
        },
      },
    },
  };

  const [results] = await searchNFTs([
    {
      body: collectionAggQuery,
      options: {
        sort,
        onlyListed,
      },
    },
  ]);

  const collectionBuckets = PrimaryCollectionAgg.create(results.aggregations)
    .primaryCollection.buckets;
  const collections = collectionBuckets.map((entry) => ({
    id: entry.key.id,
    name: entry.key.name,
    count: entry.doc_count,
  }));

  return collections;
};

const getSearchTopAggregations = nextApiHandler<SearchTopAggResponseType>(
  async (req) => {
    const searchState = SearchStateType.create(req.body);
    const { query, onlyListed, sort } = searchState;
    const rootNode = GroupNodeType.create(query.nodes[query.rootId]);
    const nodeKeys = [rootNode.id, ...rootNode.children].filter((entry) => {
      const childNode = query.nodes[entry];

      if (childNode.type === 'query' && childNode.field === 'collection') {
        return false;
      }

      return true;
    });

    const combinedQuery = nodeKeys.map((nodeKey) =>
      getNFTDependencyQueryById(query, nodeKey)
    );
    const nftQuery: QueryDslQueryContainer = {
      bool: {
        should: combinedQuery,
        minimum_should_match: 1,
      },
    };

    const aggQuery = getAttributeAggQuery();
    const searchRequest = {
      ...aggQuery,
      query: nftQuery,
    };

    const [results] = await searchNFTs([
      {
        body: searchRequest,
        options: { onlyListed, sort },
      },
    ]);

    return {
      collections: await getCollectionAggs(searchState),
      attributes: parseAttributeAggs(results.aggregations),
    };
  }
);

export default getSearchTopAggregations;
