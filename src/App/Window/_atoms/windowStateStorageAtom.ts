import { atom } from 'recoil';
import { WindowStateType } from '../../_types/WindowStateType';

const windowStateStorageAtom = atom<WindowStateType | null>({
  key: 'windowStateStorageAtom',
  default: null,
});

export default windowStateStorageAtom;
