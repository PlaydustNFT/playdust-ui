import { useRecoilValue } from 'recoil';
import accountInfoAtom from '../../_atoms/accountInfoAtom';

function useIsProgram(): boolean {
  const accountInfo = useRecoilValue(accountInfoAtom);

  return !!accountInfo?.executable;
}

export default useIsProgram;
