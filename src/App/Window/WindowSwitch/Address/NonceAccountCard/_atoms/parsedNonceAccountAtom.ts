import { selector } from 'recoil';
import { assert } from 'superstruct';
import accountInfoAtom from '../../_atoms/accountInfoAtom';
import ParsedNonceAccountType from '../_types/ParsedNonceAccountType';

const parsedNonceAccountAtom = selector<ParsedNonceAccountType | null>({
  key: 'parsedNonceAccount',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'nonce') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedNonceAccountType);

    return accountInfo.data.parsed;
  },
});

export default parsedNonceAccountAtom;
