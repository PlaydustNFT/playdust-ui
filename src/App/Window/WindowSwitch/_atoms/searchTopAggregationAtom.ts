import { selector } from 'recoil';
import frontendApi from '../../_helpers/frontendApi';
import parseSearch from '../_helpers/parseSearch';
import SearchTopAggResponseType from '../_types/SearchTopAggResponseType';
import searchStateSerializedAtom from './searchStateSerializedAtom';

const searchTopAggregationAtom = selector<SearchTopAggResponseType>({
  key: 'searchTopAggregationAtom',
  get: async ({ get }) => {
    const serialized = get(searchStateSerializedAtom);
    const searchState = parseSearch(serialized);

    if (searchState.query.rootId === '') {
      return {
        attributes: [],
        collections: [],
      };
    }

    const { data } = await frontendApi.post<SearchTopAggResponseType>(
      '/search-top-aggregations',
      searchState
    );

    return data;
  },
});

export default searchTopAggregationAtom;
