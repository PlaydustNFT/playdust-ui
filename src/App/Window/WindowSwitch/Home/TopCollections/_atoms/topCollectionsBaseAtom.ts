import { selector } from 'recoil';
import fetchTopCollections from '../_helpers/fetchTopCollections';
import type TopCollectionsResponseType from '../_types/TopCollectionsResponseType';

const topCollectionsBaseAtom = selector<TopCollectionsResponseType>({
  key: 'topCollectionsBaseAtom',
  get: async () => fetchTopCollections(0),
});

export default topCollectionsBaseAtom;
