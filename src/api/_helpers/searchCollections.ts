import type { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';
import OpenSearchCollectionSourceType from '../../App/Window/WindowSwitch/_types/OpenSearchCollectionSourceType';
import makeSearchOS from './makeSearchOS';

const existsQuery: QueryDslQueryContainer[] = [
  {
    bool: {
      must: [
        {
          exists: {
            field: 'id',
          },
        },
        {
          bool: {
            should: [
              {
                exists: {
                  field: 'name',
                },
              },
              {
                exists: {
                  field: 'symbol',
                },
              },
            ],
            minimum_should_match: 1,
          },
        },
        {
          match: {
            collectionType: 'MagicEden',
          },
        },
      ],
    },
  },
];

type SearchCollectionsType = {
  useMust?: boolean;
  includeAttributes?: boolean;
};

const collectionIndex =
  process.env.OPENSEARCH_COLLECTION_INDEX ?? 'nft-collection2';

const searchCollections = makeSearchOS<
  OpenSearchCollectionSourceType,
  SearchCollectionsType
>(collectionIndex, OpenSearchCollectionSourceType, (body, options) => {
  const wrappedQuery: QueryDslQueryContainer = {
    bool: {
      [options?.useMust ? 'must' : 'filter']: [
        ...existsQuery,
        body?.query,
      ].filter(Boolean),
    },
  };

  return {
    ...body,
    query: wrappedQuery,
    _source: options?.includeAttributes
      ? undefined
      : {
          exclude: ['attributes'],
        },
  };
});

export default searchCollections;
