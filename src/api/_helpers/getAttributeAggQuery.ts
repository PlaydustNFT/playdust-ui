import { SearchRequest } from '@opensearch-project/opensearch/api/types';

const getAttributeAggQuery = (
  aggSize = 20,
  aggOptionSize = 50
): SearchRequest['body'] => ({
  size: 0,
  aggs: {
    name: {
      nested: {
        path: 'attributes',
      },
      aggs: {
        key: {
          terms: {
            field: 'attributes.key.keyword',
            size: aggSize,
          },
          aggs: {
            value: {
              terms: {
                field: 'attributes.value.keyword',
                size: aggOptionSize,
              },
            },
          },
        },
      },
    },
  },
});

export default getAttributeAggQuery;
