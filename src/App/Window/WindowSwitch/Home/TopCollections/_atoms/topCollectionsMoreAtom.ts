import { atom } from 'recoil';
import type TopCollectionsResponseType from '../_types/TopCollectionsResponseType';

const topCollectionsMoreAtom = atom<TopCollectionsResponseType[]>({
  key: 'topCollectionsMoreAtom',
  default: [],
});

export default topCollectionsMoreAtom;
