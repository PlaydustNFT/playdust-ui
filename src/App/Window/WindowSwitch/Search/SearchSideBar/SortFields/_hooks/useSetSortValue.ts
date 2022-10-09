import makeUseChangeSearchQuery from '../../../../_hooks/makeUseChangeSearchQuery';
import SearchSortType from '../../../../_types/SearchSortType';

const useSetSortValue = makeUseChangeSearchQuery(
  () => (nextSort: SearchSortType) => {
    if (nextSort.field === 'list-price') {
      return { sort: nextSort, onlyListed: true };
    }

    return { sort: nextSort, onlyListed: false };
  }
);

export default useSetSortValue;
