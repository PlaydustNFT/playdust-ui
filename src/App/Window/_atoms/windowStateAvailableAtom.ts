import { selector } from 'recoil';
import windowStateStorageAtom from './windowStateStorageAtom';

const windowStateAvailableAtom = selector<boolean>({
  key: 'windowStateAvailableAtom',
  get: ({ get }) => {
    const windowState = get(windowStateStorageAtom);
    if (!windowState) {
      return false;
    }
    return true;
  },
});

export default windowStateAvailableAtom;
