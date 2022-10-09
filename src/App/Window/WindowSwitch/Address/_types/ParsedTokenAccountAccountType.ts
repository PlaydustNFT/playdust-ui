import {
  boolean,
  enums,
  Infer,
  literal,
  number,
  optional,
  string,
  type,
} from 'superstruct';

const TokenAmount = type({
  decimals: number(),
  uiAmountString: string(),
  uiAmount: number(),
  amount: string(),
});

const AccountState = enums(['initialized', 'uninitialized', 'frozen']);

const TokenAccountInfo = type({
  mint: string(),
  owner: string(),
  tokenAmount: TokenAmount,
  delegate: optional(string()),
  state: AccountState,
  isNative: boolean(),
  rentExemptReserve: optional(TokenAmount),
  delegatedAmount: optional(TokenAmount),
  closeAuthority: optional(string()),
});

export type ParsedTokenAccountAccountType = Infer<
  typeof ParsedTokenAccountAccountType
>;
export const ParsedTokenAccountAccountType = type({
  type: literal('account'),
  info: TokenAccountInfo,
});
