import { atom } from 'recoil';
import PlaydustProfileType from '../_types/PlaydustProfileType';

const appProfileAtom = atom<PlaydustProfileType | null>({
  key: 'appProfileAtom',
  default: null,
});

export default appProfileAtom;
