import { selector } from 'recoil';
import { assert } from 'superstruct';
import accountInfoAtom from '../../_atoms/accountInfoAtom';
import ParsedStakeAccountType from '../_types/ParsedStakeAccountType';
import StakeAccountAtomType from '../_types/StakeAccountAtomType';
import stakeActivationAtom from './stakeActivationAtom';

const parsedStakeAccountAtom = selector<StakeAccountAtomType | null>({
  key: 'parsedStakeAccount',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'stake') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedStakeAccountType);

    // We have to make this call here - as opposed to letting the component call it.
    // This is because the underlying connection.getStakeActivation will throw an Error
    // if the pubkey passed to it is not of data.program 'stake'
    const stakeActivation = get(stakeActivationAtom);
    if (!stakeActivation) {
      return null;
    }

    return {
      parsed: accountInfo.data.parsed,
      stakeActivation,
    };
  },
});

export default parsedStakeAccountAtom;
