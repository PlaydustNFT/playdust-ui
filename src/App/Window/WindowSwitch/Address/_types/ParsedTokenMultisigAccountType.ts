import {
  array,
  boolean,
  Infer,
  literal,
  number,
  string,
  type,
} from 'superstruct';

const MultisigAccountInfo = type({
  numRequiredSigners: number(),
  numValidSigners: number(),
  isInitialized: boolean(),
  signers: array(string()),
});

export type ParsedTokenMultisigAccountType = Infer<
  typeof ParsedTokenMultisigAccountType
>;
export const ParsedTokenMultisigAccountType = type({
  type: literal('multisig'),
  info: MultisigAccountInfo,
});
