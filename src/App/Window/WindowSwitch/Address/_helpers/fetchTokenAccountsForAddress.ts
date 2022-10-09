import { Connection, PublicKey } from '@solana/web3.js';
import { create } from 'superstruct';
import SolanaClusterType from '../../../../_types/SolanaClusterType';
import safePubkey from '../../_helpers/safePubkey';
import { AccountInfoType } from '../_types/AccountInfoType';
import { ParsedTokenAccountType } from '../_types/ParsedTokenAccountType';
import TokenAccountsType from '../_types/TokenAccountsType';

const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

async function fetchTokenAccountsForAddress(
  cluster: SolanaClusterType,
  pubkey: PublicKey
): Promise<TokenAccountsType[]> {
  const connection = new Connection(cluster.endpoint);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    safePubkey(pubkey),
    {
      programId: TOKEN_PROGRAM_ID,
    }
  );

  const typedTokenAccounts = tokenAccounts.value
    .map<TokenAccountsType | null>((account) => {
      const accountInfo = create(account.account, AccountInfoType);

      if (Buffer.isBuffer(accountInfo.data)) {
        return null;
      }

      const parsedAccountData = create(
        accountInfo.data.parsed,
        ParsedTokenAccountType
      );

      if (parsedAccountData.type !== 'account') {
        return null;
      }

      return {
        pubkey: account.pubkey,
        data: parsedAccountData,
      };
    })
    .filter((account): account is TokenAccountsType => Boolean(account));

  return typedTokenAccounts;
}

export default fetchTokenAccountsForAddress;
