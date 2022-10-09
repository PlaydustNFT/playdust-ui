import { enums, Infer, type } from 'superstruct';

const SortFieldEnum = enums([
  'name',
  'relevance',
  'list-price',
  'sale-price',
  'rarity-score',
]);

const SortDirectionEnum = enums(['asc', 'desc']);

type SearchSortType = Infer<typeof SearchSortType>;
const SearchSortType = type({
  field: SortFieldEnum,
  direction: SortDirectionEnum,
});

export default SearchSortType;
