import { Infer, union } from 'superstruct';
import { ParsedTokenAccountAccountType } from './ParsedTokenAccountAccountType';
import { ParsedTokenMintAccountType } from './ParsedTokenMintAccountType';
import { ParsedTokenMultisigAccountType } from './ParsedTokenMultisigAccountType';

// https://github.com/solana-labs/solana/blob/master/explorer/src/validators/accounts/token.ts

export type ParsedTokenAccountType = Infer<typeof ParsedTokenAccountType>;
export const ParsedTokenAccountType = union([
  ParsedTokenAccountAccountType,
  ParsedTokenMintAccountType,
  ParsedTokenMultisigAccountType,
]);
