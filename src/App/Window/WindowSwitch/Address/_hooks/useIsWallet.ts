import { PublicKey } from '@solana/web3.js';
import { useRecoilValue } from 'recoil';
import addressStateAtom from '../../_atoms/addressStateAtom';
import accountInfoAtom from '../_atoms/accountInfoAtom';

function useIsWallet(): boolean {
  const addressState = useRecoilValue(addressStateAtom);
  const accountInfo = useRecoilValue(accountInfoAtom);

  if (!addressState) {
    return false;
  }
  return !!(
    addressState.hasPrivateKey &&
    accountInfo?.owner.equals(new PublicKey('11111111111111111111111111111111'))
  );
}

export default useIsWallet;
