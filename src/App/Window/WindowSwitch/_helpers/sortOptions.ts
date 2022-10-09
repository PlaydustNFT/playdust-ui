import type SearchSortType from '../_types/SearchSortType';

type SearchSortOption = {
  name: string;
  value: SearchSortType;
};

const makeSortOption = (
  name: string,
  field: SearchSortType['field'],
  reverse?: boolean
) => {
  const result: SearchSortOption[] = [
    {
      name: `${name}: asc`,
      value: {
        field,
        direction: 'asc',
      },
    },
    {
      name: `${name}: desc`,
      value: {
        field,
        direction: 'desc',
      },
    },
  ];

  if (reverse) {
    return result.reverse();
  }

  return result;
};

const sortOptions: SearchSortOption[] = [
  ...makeSortOption('Rarity', 'rarity-score', true),
  ...makeSortOption('Name', 'name'),
  ...makeSortOption('List Price', 'list-price'),
  ...makeSortOption('Sale Price', 'sale-price'),
  {
    name: 'Relevance',
    value: {
      field: 'relevance',
      direction: 'desc',
    },
  },
];

export default sortOptions;
