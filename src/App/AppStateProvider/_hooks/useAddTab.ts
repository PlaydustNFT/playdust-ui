import { useRecoilState } from 'recoil';
import appState from '../../_atoms/appStateAtom';
import AppTabType from '../../_types/AppTabType';
import type { WindowStateType } from '../../_types/WindowStateType';

const useAddTab = () => {
  const [state, setter] = useRecoilState(appState);

  return (windowState: WindowStateType, addAtCurrIdx?: boolean): void => {
    const newTab: AppTabType = {
      id: windowState.tabId,
      windows: [
        {
          state: windowState.state,
          type: windowState.type,
        },
      ],
      selectedWindowIdx: 0,
    };

    const insertAt = addAtCurrIdx
      ? state.tabs.findIndex((tab) => tab.id === state.selectedTabId)
      : state.tabs.length;

    const tabs = [
      ...state.tabs.slice(0, insertAt),
      newTab,
      ...state.tabs.slice(insertAt),
    ];

    setter({
      tabs,
      selectedTabId: newTab.id,
    });
  };
};

export default useAddTab;
