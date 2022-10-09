import type { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';
import QueryNodeType from '../../App/Window/WindowSwitch/_types/QueryNodeType';
import RangeValueUnionType from '../../App/Window/WindowSwitch/_types/RangeValueUnionType';

const getRangeField = (field: RangeValueUnionType) => {
  switch (field) {
    case 'list-price':
      return 'listedPrice';
    case 'sale-price':
      return 'lastSalePrice';
    case 'rarity-score':
      return 'normalizedRarityScore';
    default: {
      const n: never = field;

      return n;
    }
  }
};

const createSingleNFTQuery = (child: QueryNodeType): QueryDslQueryContainer => {
  switch (child.field) {
    case 'attribute': {
      const { key, value } = child;

      return {
        nested: {
          path: 'attributes',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'attributes.key.keyword': key,
                  },
                },
                {
                  match: {
                    'attributes.value.keyword': value,
                  },
                },
              ],
            },
          },
        },
      };
    }
    case 'collection': {
      const { value } = child;

      return {
        nested: {
          path: 'collections',
          query: {
            term: {
              'collections.id': value,
            },
          },
        },
      };
    }
    case 'text': {
      const { value } = child;

      return {
        bool: {
          should: [
            {
              multi_match: {
                query: value,
                fuzziness: 'AUTO',
                fields: ['name'],
              },
            },
            {
              nested: {
                path: 'attributes',
                query: {
                  multi_match: {
                    query: value,
                    fields: ['attributes.value'],
                    fuzziness: 'AUTO',
                  },
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      };
    }
    case 'range': {
      const rangeField = getRangeField(child.value);

      const must = [
        {
          range: {
            [rangeField]: {
              gte: child.min,
              lte: child.max,
            },
          },
        },
      ];

      return {
        bool: {
          must,
        },
      };
    }
    default: {
      const n: never = child;

      return n;
    }
  }
};

export default createSingleNFTQuery;
