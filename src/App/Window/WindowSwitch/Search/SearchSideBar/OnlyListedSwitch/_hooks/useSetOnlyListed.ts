import makeUseChangeSearchQuery from '../../../../_hooks/makeUseChangeSearchQuery';

const useSetOnlyListed = makeUseChangeSearchQuery(
  () => (nextOnlyListed: boolean) => ({ onlyListed: nextOnlyListed })
);

export default useSetOnlyListed;
