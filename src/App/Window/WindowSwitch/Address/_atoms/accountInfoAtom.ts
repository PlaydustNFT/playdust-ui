import { Connection } from '@solana/web3.js';
import { selector } from 'recoil';
import { create } from 'superstruct';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../_atoms/addressStateAtom';
import safePubkey from '../../_helpers/safePubkey';
import { AccountInfoType } from '../_types/AccountInfoType';

const accountInfoAtom = selector<AccountInfoType | null>({
  key: 'accountInfo',
  get: async ({ get }) => {
    const addressState = get(addressStateAtom);
    const solanaCluster = get(solanaClusterAtom);

    if (!addressState) {
      return null;
    }
    const connection = new Connection(solanaCluster.endpoint, 'confirmed');
    const accountInfoResult = await connection.getParsedAccountInfo(
      safePubkey(addressState.pubkey)
    );

    if (accountInfoResult.value === null) {
      return null;
    }
    const accountInfo = create(accountInfoResult?.value, AccountInfoType);

    return {
      ...accountInfo,
      space: Buffer.isBuffer(accountInfo.data)
        ? accountInfo.data.length
        : accountInfo.data.space,
    };
  },
});

export default accountInfoAtom;
