import { selector } from 'recoil';
import { assert } from 'superstruct';
import ParsedBPFUpgradeableLoaderAccountType from '../_types/ParsedBPFUpgradeableLoaderAccountType';
import accountInfoAtom from './accountInfoAtom';

const parsedBPFUpgradeableLoaderAccountAtom =
  selector<ParsedBPFUpgradeableLoaderAccountType | null>({
    key: 'parsedBPFUpgradeableLoaderAccountAtom',
    get: ({ get }) => {
      const accountInfo = get(accountInfoAtom);

      if (!accountInfo || Buffer.isBuffer(accountInfo.data)) {
        return null;
      }
      if (accountInfo.data.program !== 'bpf-upgradeable-loader') {
        return null;
      }

      assert(accountInfo.data.parsed, ParsedBPFUpgradeableLoaderAccountType);

      return accountInfo.data.parsed;
    },
  });

export default parsedBPFUpgradeableLoaderAccountAtom;
