import { atom } from 'recoil';
import WindowSetImagesType from '../_types/WindowSetImagesType';

const setWindowImagesAtom = atom<WindowSetImagesType | null>({
  key: 'setWindowImagesAtom',
  default: null,
});

export default setWindowImagesAtom;
