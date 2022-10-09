import type SearchStateType from '../_types/SearchStateType';
import validateSearchQuery from './validateSearchQuery';

const serializeSearch = (state: SearchStateType) => {
  const { query, sort, onlyListed } = state;

  if (!validateSearchQuery(query)) {
    return '';
  }

  const raw = {
    query,
    sort,
    onlyListed,
  };

  const result = JSON.stringify(raw);

  return result;
};

export default serializeSearch;
