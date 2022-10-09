import {
  QueryDslQueryContainer,
  SearchRequest,
} from '@opensearch-project/opensearch/api/types';
import { string } from 'superstruct';
import CollectionOverviewResponseType from '../App/Window/WindowSwitch/_types/CollectionOverviewResponseType';
import OpenSearchCollectionSourceType from '../App/Window/WindowSwitch/_types/OpenSearchCollectionSourceType';
import getRarestNFTsByCollectionBody from './_helpers/getRarestNFTsByCollectionBody';
import nextApiHandler from './_helpers/nextApiHandler';
import searchCollections from './_helpers/searchCollections';
import searchNFTs from './_helpers/searchNFTs';

const getSeedQuery = (collectionId: string) => ({
  size: 1,
  _source: {
    exclude: ['attributes'],
  },
  query: {
    ids: {
      values: [collectionId],
    },
  },
});

const getMatchField = (
  key: string,
  input: string | null | undefined,
  fuzzy = false
): QueryDslQueryContainer[] => {
  if (!input || input === '') {
    return [];
  }

  if (fuzzy) {
    return [
      {
        multi_match: {
          query: input,
          fuzziness: 'AUTO',
          fields: [key],
        },
      },
    ];
  }

  return [
    {
      match: {
        [key]: input,
      },
    },
  ];
};

const getSimilarCollectionQuery = ({
  id,
  name,
  description,
  symbol,
}: OpenSearchCollectionSourceType): SearchRequest['body'] => ({
  _source: {
    exclude: ['attributes'],
  },
  size: 20,
  query: {
    bool: {
      must: [
        {
          bool: {
            must_not: {
              term: {
                id,
              },
            },
          },
        },
        {
          bool: {
            should: [
              {
                bool: {
                  should: [
                    ...getMatchField('name', name, true),
                    ...getMatchField('symbol', symbol, true),
                  ],
                  minimum_should_match: 2,
                },
              },
              ...getMatchField('name.keyword', name),
              ...getMatchField('symbol.keyword', symbol),
              ...getMatchField('description.keyword', description),
            ],
            minimum_should_match: 1,
          },
        },

        {
          nested: {
            path: 'attributes',
            query: {
              exists: {
                field: 'attributes',
              },
            },
          },
        },
      ],
    },
  },
  sort: [
    '_score',
    {
      'volume.global.total': {
        order: 'desc',
      },
    },
  ],
});

const getNFTQuery = (collectionId: string): QueryDslQueryContainer => ({
  bool: {
    filter: [
      {
        nested: {
          path: 'collections',
          query: {
            term: {
              'collections.id': collectionId,
            },
          },
        },
      },
    ],
  },
});

const getCollectionOverview = nextApiHandler<CollectionOverviewResponseType>(
  async (req) => {
    const collectionId = string().create(req.query.id);

    const seedQuery = getSeedQuery(collectionId);
    const [seedResult] = await searchCollections([{ body: seedQuery }]);
    const seed = seedResult.sources[0];

    const similarCollectionQuery = getSimilarCollectionQuery(seed);
    const [similarResult] = await searchCollections([
      { body: similarCollectionQuery },
    ]);

    const [collectionListedResult, rarestNFTs] = await searchNFTs([
      {
        body: {
          query: getNFTQuery(collectionId),
          size: 0,
        },
        options: {
          onlyListed: true,
        },
      },
      {
        body: getRarestNFTsByCollectionBody(collectionId),
      },
    ]);

    const rarestImages = rarestNFTs.sources.map((entry) => entry.image);

    return {
      ...seed,
      elementCount: seed.elementCount || 0,
      similar: similarResult.sources,
      listed: collectionListedResult.total,
      images: rarestImages,
    };
  }
);

export default getCollectionOverview;
