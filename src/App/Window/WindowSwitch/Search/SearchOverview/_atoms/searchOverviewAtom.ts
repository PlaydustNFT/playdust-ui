import { selector } from 'recoil';
import frontendApi from '../../../../_helpers/frontendApi';
import searchStateSerializedAtom from '../../../_atoms/searchStateSerializedAtom';
import parseSearch from '../../../_helpers/parseSearch';
import searchResultsBaseAtom from '../../_atoms/searchResultsBaseAtom';
import type SearchOverviewResponseType from '../_types/SearchOverviewResponseType';

const searchOverviewAtom = selector<SearchOverviewResponseType>({
  key: 'searchOverviewAtom',
  get: async ({ get }) => {
    const base = get(searchResultsBaseAtom);
    const serialized = get(searchStateSerializedAtom);
    const parsed = parseSearch(serialized);

    if (!parsed || parsed.query.rootId === '') {
      return {
        listed: 0,
        floor: 0,
        ceiling: 0,
        average: 0,
        total: 0,
      };
    }

    const { data } = await frontendApi.post<SearchOverviewResponseType>(
      '/search-overview',
      {
        query: parsed.query,
      }
    );

    return {
      ...data,
      total: base.total,
    };
  },
});

export default searchOverviewAtom;
