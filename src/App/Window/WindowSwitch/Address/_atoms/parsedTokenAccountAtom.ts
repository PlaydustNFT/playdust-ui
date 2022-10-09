import { selector } from 'recoil';
import { assert } from 'superstruct';
import { ParsedTokenAccountType } from '../_types/ParsedTokenAccountType';
import accountInfoAtom from './accountInfoAtom';

const parsedTokenAccountAtom = selector<ParsedTokenAccountType | null>({
  key: 'parsedTokenAccountAtom',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'spl-token') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedTokenAccountType);

    return accountInfo.data.parsed;
  },
});

export default parsedTokenAccountAtom;
