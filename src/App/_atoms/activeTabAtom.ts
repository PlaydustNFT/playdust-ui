import { selector } from 'recoil';
import TabType from '../_types/AppTabType';
import appState from './appStateAtom';

const activeTabAtom = selector<TabType>({
  key: 'activeTabAtom',
  get: ({ get }) => {
    const { tabs, selectedTabId } = get(appState);
    const found = tabs?.find((tab) => tab.id === selectedTabId);

    return found || tabs[0];
  },
});

export default activeTabAtom;
