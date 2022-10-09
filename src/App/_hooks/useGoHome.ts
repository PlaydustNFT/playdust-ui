import { useRecoilValue } from 'recoil';
import activeWindowAtom from '../_atoms/activeWindowAtom';
import usePushWindowHash from './usePushWindowHash';

const useGoHome = () => {
  const pushWindowHash = usePushWindowHash();
  const windowState = useRecoilValue(activeWindowAtom);

  return () => {
    pushWindowHash({ type: 'home', state: '', tabId: windowState.tabId });
  };
};

export default useGoHome;
