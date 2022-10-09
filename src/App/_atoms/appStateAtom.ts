import { atom } from 'recoil';
import getDefaultAppState from '../_helpers/getDefaultAppState';
import persistenceEffect from '../_helpers/persistenceEffect';
import { AppStateType } from '../_types/AppStateType';

const appStateAtom = atom<AppStateType>({
  key: 'appStateAtom',
  default: getDefaultAppState(),
  effects: [persistenceEffect<AppStateType>(AppStateType, 'localStorage')],
});

export default appStateAtom;
