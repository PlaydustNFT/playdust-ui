import { boolean, Infer, optional, type } from 'superstruct';
import SearchQueryType from './SearchQueryType';
import SearchSortType from './SearchSortType';

type SearchStateType = Infer<typeof SearchStateType>;
const SearchStateType = type({
  query: SearchQueryType,
  sort: optional(SearchSortType),
  onlyListed: optional(boolean()),
});

export default SearchStateType;
