import { selector } from 'recoil';
import { assert } from 'superstruct';
import { ParsedConfigAccountType } from '../_types/ParsedConfigAccountType';
import accountInfoAtom from './accountInfoAtom';

const parsedConfigAccountAtom = selector<ParsedConfigAccountType | null>({
  key: 'parsedConfigAccountAtom',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'config') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedConfigAccountType);

    return accountInfo.data.parsed;
  },
});

export default parsedConfigAccountAtom;
