import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import searchStateSerializedAtom from '../../../_atoms/searchStateSerializedAtom';
import fetchSearchResults from '../../_helpers/fetchSearchResults';
import searchResultsAtom from '../_atoms/searchResultsAtom';
import searchResultsMore from '../_atoms/searchResultsMoreAtom';

const useFetchMoreSearchResults = () => {
  const setter = useSetRecoilState(searchResultsMore);
  const serialized = useRecoilValue(searchStateSerializedAtom);
  const loadable = useRecoilValueLoadable(searchResultsAtom);

  return async () => {
    if (loadable.state === 'hasValue') {
      const { page } = loadable.contents;
      const nextPage = await fetchSearchResults(serialized, page + 1);

      setter((curr) => [...curr, nextPage]);
    }
  };
};

export default useFetchMoreSearchResults;
