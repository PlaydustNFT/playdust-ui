import shortId from '../../_helpers/shortId';
import usePushWindowHash from '../../_hooks/usePushWindowHash';

const useGoToNewTab = () => {
  const pushWindowHash = usePushWindowHash();

  return () => {
    pushWindowHash({ type: 'home', state: '', tabId: shortId() });
  };
};

export default useGoToNewTab;
