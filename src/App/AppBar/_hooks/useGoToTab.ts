import usePushWindowHash from '../../_hooks/usePushWindowHash';
import TabType from '../../_types/AppTabType';

const useGoToTab = () => {
  const pushWindowHash = usePushWindowHash();

  return (tab: TabType) => {
    const activeWindow = tab.windows[tab.selectedWindowIdx];

    pushWindowHash({
      ...activeWindow,
      tabId: tab.id,
    });
  };
};

export default useGoToTab;
