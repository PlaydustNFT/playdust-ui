import { selector } from 'recoil';
import { WindowStateType } from '../../_types/WindowStateType';
import windowStateStorageAtom from './windowStateStorageAtom';

const windowStateAtom = selector<WindowStateType>({
  key: 'windowStateAtom',
  get: ({ get }) => {
    const windowState = get(windowStateStorageAtom);
    if (!windowState) {
      throw new Error('WindowState undefined!');
    }
    return windowState;
  },
  set: ({ set }, newValue) => set(windowStateStorageAtom, newValue),
});

export default windowStateAtom;
