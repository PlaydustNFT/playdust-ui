import { Connection } from '@solana/web3.js';
import { selector } from 'recoil';
import { is } from 'superstruct';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../_atoms/addressStateAtom';
import safePubkey from '../../_helpers/safePubkey';
import { AccountInfoType } from '../_types/AccountInfoType';
import { ParsedTokenAccountType } from '../_types/ParsedTokenAccountType';
import parsedTokenAccountAtom from './parsedTokenAccountAtom';

const currentOwnerForMintAtom = selector<string | null>({
  key: 'currentOwnerForMintAtom',
  get: async ({ get }) => {
    const solanaCluster = get(solanaClusterAtom);
    const parsedAccount = get(parsedTokenAccountAtom);
    const addressState = get(addressStateAtom);

    if (!addressState || parsedAccount?.type !== 'mint') {
      return null;
    }

    const connection = new Connection(solanaCluster.endpoint, 'confirmed');
    const { value: tokenAccounts } = await connection.getTokenLargestAccounts(
      safePubkey(addressState.pubkey)
    );

    const ownerTokenAccount = tokenAccounts.find(
      (account) => (account.uiAmount || 0) > 0
    );

    if (!ownerTokenAccount) {
      return null;
    }

    const { value: tokenAccountInfo } = await connection.getParsedAccountInfo(
      safePubkey(ownerTokenAccount.address)
    );

    if (
      !is(tokenAccountInfo, AccountInfoType) ||
      Buffer.isBuffer(tokenAccountInfo.data) ||
      !is(tokenAccountInfo.data.parsed, ParsedTokenAccountType) ||
      tokenAccountInfo.data.parsed.type !== 'account'
    ) {
      return null;
    }

    return tokenAccountInfo.data.parsed.info.owner;
  },
});

export default currentOwnerForMintAtom;
