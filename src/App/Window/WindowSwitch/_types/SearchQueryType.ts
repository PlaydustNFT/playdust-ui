import { Infer, record, string, type } from 'superstruct';
import SearchQueryNodeType from './SearchQueryNodeType';

type SearchQueryType = Infer<typeof SearchQueryType>;
const SearchQueryType = type({
  rootId: string(),
  nodes: record(string(), SearchQueryNodeType),
});

export default SearchQueryType;
