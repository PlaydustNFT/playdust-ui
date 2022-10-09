import { PublicKey } from '@solana/web3.js';
import { ParsedTokenAccountAccountType } from './ParsedTokenAccountAccountType';

type TokenAccountsType = {
  pubkey: PublicKey;
  data: ParsedTokenAccountAccountType;
};

export default TokenAccountsType;
