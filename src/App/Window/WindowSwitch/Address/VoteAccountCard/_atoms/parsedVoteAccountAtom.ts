import { selector } from 'recoil';
import { assert } from 'superstruct';
import accountInfoAtom from '../../_atoms/accountInfoAtom';
import ParsedVoteAccountType from '../_types/ParsedVoteAccountType';

const parsedVoteAccountAtom = selector<ParsedVoteAccountType | null>({
  key: 'parsedVoteAccountAtom',
  get: ({ get }) => {
    const accountInfo = get(accountInfoAtom);

    if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
      return null;
    }
    if (accountInfo.data.program !== 'vote') {
      return null;
    }

    assert(accountInfo.data.parsed, ParsedVoteAccountType);

    return accountInfo.data.parsed;
  },
});

export default parsedVoteAccountAtom;
