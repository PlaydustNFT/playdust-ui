import { selectorFamily } from 'recoil';
import frontendApi from '../../../../_helpers/frontendApi';
import searchStateSerializedAtom from '../../../_atoms/searchStateSerializedAtom';
import parseSearch from '../../../_helpers/parseSearch';
import type SearchAggResponseType from '../../../_types/SearchAggResponseType';

const searchAggsByNodeAtom = selectorFamily<SearchAggResponseType, string>({
  key: 'searchAggsByNodeAtom',
  get:
    (activeNodeId) =>
    async ({ get }) => {
      const serialized = get(searchStateSerializedAtom);
      const { query } = parseSearch(serialized);

      const { data } = await frontendApi.post<SearchAggResponseType>(
        '/search-aggregations',
        {
          query,
          activeNodeId,
        }
      );

      return data;
    },
});

export default searchAggsByNodeAtom;
