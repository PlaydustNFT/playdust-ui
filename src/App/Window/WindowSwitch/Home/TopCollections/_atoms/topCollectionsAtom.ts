import { selector } from 'recoil';
import type TopCollectionsResponseType from '../_types/TopCollectionsResponseType';
import topCollectionsBaseAtom from './topCollectionsBaseAtom';
import topCollectionsMoreAtom from './topCollectionsMoreAtom';

const topCollectionsAtom = selector<TopCollectionsResponseType>({
  key: 'topCollectionsAtom',
  get: ({ get }) => {
    const base = get(topCollectionsBaseAtom);
    const more = get(topCollectionsMoreAtom);

    const result = more.reduce<TopCollectionsResponseType>(
      (acc, curr) => ({
        ...acc,
        total: curr.total,
        page: Math.max(acc.page, curr.page),
        results: [...acc.results, ...curr.results],
      }),
      base
    );

    return result;
  },
});

export default topCollectionsAtom;
