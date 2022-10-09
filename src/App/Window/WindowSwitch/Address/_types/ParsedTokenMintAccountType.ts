import {
  boolean,
  Infer,
  literal,
  nullable,
  number,
  string,
  type,
} from 'superstruct';

const MintAccountInfo = type({
  mintAuthority: nullable(string()),
  supply: string(),
  decimals: number(),
  isInitialized: boolean(),
  freezeAuthority: nullable(string()),
});

export type ParsedTokenMintAccountType = Infer<
  typeof ParsedTokenMintAccountType
>;
export const ParsedTokenMintAccountType = type({
  type: literal('mint'),
  info: MintAccountInfo,
});
