import type { AppStateType } from '../_types/AppStateType';
import AppWindowType from '../_types/AppWindowType';
import shortId from './shortId';

const newHomeWindow: () => AppWindowType = () => ({
  type: 'home',
  state: '',
});

const getDefaultAppState = (tabId?: string): AppStateType => {
  const homeWindow = newHomeWindow();
  const newTabId = tabId ?? shortId();

  return {
    tabs: [
      {
        id: newTabId,
        windows: [homeWindow],
        selectedWindowIdx: 0,
      },
    ],
    selectedTabId: newTabId,
  };
};

export default getDefaultAppState;
