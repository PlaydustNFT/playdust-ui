import { selectorFamily } from 'recoil';
import api from '../../../../../_helpers/frontendApi';
import type OpenSearchCollectionSourceType from '../../../../_types/OpenSearchCollectionSourceType';

const collectionByIdAtom = selectorFamily({
  key: 'collectionByIdAtom',
  get: (id) => async () => {
    const { data } = await api.post<OpenSearchCollectionSourceType[]>(
      '/collections',
      [id]
    );

    return data[0];
  },
});

export default collectionByIdAtom;
