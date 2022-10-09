import type { SearchRequest } from '@opensearch-project/opensearch/api/types';

const getCollectionsByIdsBody = (ids: string[]): SearchRequest['body'] => ({
  size: ids.length,
  query: {
    bool: {
      filter: {
        ids: {
          values: ids,
        },
      },
    },
  },
});

export default getCollectionsByIdsBody;
