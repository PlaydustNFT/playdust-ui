import type { SearchRequest } from '@opensearch-project/opensearch/api/types';

const getRarestNFTsByCollectionBody = (
  collectionId: string,
  size = 10
): SearchRequest['body'] => ({
  size,
  _source: ['mint', 'image', 'name'],
  query: {
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
        {
          exists: {
            field: 'image',
          },
        },
      ],
    },
  },
  sort: [
    {
      normalizedRarityScore: 'desc',
    },
  ],
});

export default getRarestNFTsByCollectionBody;
