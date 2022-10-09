import { Infer, union } from 'superstruct';
import GroupNodeType from './GroupNodeType';
import QueryNodeType from './QueryNodeType';

type SearchQueryNodeType = Infer<typeof SearchQueryNodeType>;
const SearchQueryNodeType = union([GroupNodeType, QueryNodeType]);

export default SearchQueryNodeType;
