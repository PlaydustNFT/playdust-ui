import api from '../../../_helpers/frontendApi';
import parseSearch from '../../_helpers/parseSearch';
import type SearchResponseType from '../_types/SearchResponseType';

const initialState = {
  total: 0,
  page: 0,
  nfts: [],
};

const fetchSearchResults = async (
  serialized: string,
  page: number
): Promise<SearchResponseType> => {
  try {
    const parsed = parseSearch(serialized);

    if (Object.values(parsed.query.nodes).length === 0) {
      return initialState;
    }

    const body = {
      ...parsed,
      page,
    };

    const { data } = await api.post<SearchResponseType>('/search', body);

    return data;
  } catch (err) {
    return initialState;
  }
};

export default fetchSearchResults;
