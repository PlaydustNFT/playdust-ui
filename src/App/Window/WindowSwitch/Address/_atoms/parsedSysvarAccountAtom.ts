import { selector } from 'recoil';
import { assert } from 'superstruct';
import ParsedSysvarAccountType from '../_types/ParsedSysvarAccountType';
import accountInfoAtom from './accountInfoAtom';

const parsedSysvarAccountAtom = selector<ParsedSysvarAccountType | null>({
  key: 'parsedSysvarAccountAtom',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'sysvar') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedSysvarAccountType);

    return accountInfo.data.parsed;
  },
});

export default parsedSysvarAccountAtom;
