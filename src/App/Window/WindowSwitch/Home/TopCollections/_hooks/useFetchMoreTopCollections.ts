import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import topCollectionsAtom from '../_atoms/topCollectionsAtom';
import topCollectionsMore from '../_atoms/topCollectionsMoreAtom';
import fetchTopCollections from '../_helpers/fetchTopCollections';

const useFetchMoreTopCollections = () => {
  const topCollectionsLoadable = useRecoilValueLoadable(topCollectionsAtom);
  const setter = useSetRecoilState(topCollectionsMore);

  return async () => {
    if (topCollectionsLoadable.state === 'hasValue') {
      const { page } = topCollectionsLoadable.contents;
      const nextPage = await fetchTopCollections(page + 1);

      setter((curr) => [...curr, { ...nextPage }]);
    }
  };
};

export default useFetchMoreTopCollections;
