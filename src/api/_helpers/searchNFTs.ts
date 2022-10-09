import type {
  QueryDslQueryContainer,
  SearchSort,
} from '@opensearch-project/opensearch/api/types';
import OpenSearchNFTSourceType from '../../App/Window/WindowSwitch/_types/OpenSearchNFTSourceType';
import SearchSortType from '../../App/Window/WindowSwitch/_types/SearchSortType';
import makeSearchOS from './makeSearchOS';

const onlyListedQuery: QueryDslQueryContainer[] = [
  {
    exists: {
      field: 'listedPrice',
    },
  },
];

const getSort = (sort: SearchSortType | undefined): SearchSort | undefined => {
  if (!sort) {
    return undefined;
  }

  switch (sort.field) {
    case 'name':
      return [
        {
          'name.sort': sort.direction,
        },
      ];
    case 'list-price':
      return [
        {
          listedPrice: sort.direction,
        },
      ];
    case 'sale-price':
      return [
        {
          lastSalePrice: sort.direction,
        },
      ];
    case 'rarity-score':
      return [
        {
          normalizedRarityScore: sort.direction,
        },
      ];
    case 'relevance':
      return [
        '_score',
        {
          normalizedRarityScore: 'desc',
        },
      ];
    default:
  }
};

type SearchNFTsOptionsType = {
  sort?: SearchSortType;
  onlyListed?: boolean;
};

const metadataIndex = process.env.OPENSEARCH_METADATA_INDEX ?? 'nft-metadata2';

const searchNFTs = makeSearchOS<OpenSearchNFTSourceType, SearchNFTsOptionsType>(
  metadataIndex,
  OpenSearchNFTSourceType,
  (body, { sort, onlyListed } = {}) => {
    const isRelevanceSort = sort?.field === 'relevance';
    const wrappedQuery: QueryDslQueryContainer = {
      bool: {
        [isRelevanceSort ? 'must' : 'filter']: [
          ...(onlyListed ? onlyListedQuery : []),
          body?.query,
        ],
      },
    };

    return {
      ...body,
      query: wrappedQuery,
      sort: getSort(sort),
    };
  }
);

export default searchNFTs;
