import { useWallet } from '@solana/wallet-adapter-react';
import shortId from '../../../_helpers/shortId';
import usePushWindowHash from '../../../_hooks/usePushWindowHash';

const useGoToProfile = () => {
  const wallet = useWallet();
  const pushWindowHash = usePushWindowHash();

  return () => {
    if (wallet.publicKey) {
      const state = wallet.publicKey.toBase58();
      pushWindowHash({ type: 'address', state, tabId: shortId() });
    }
  };
};

export default useGoToProfile;
