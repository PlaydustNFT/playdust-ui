import { ParsedAccountData, PublicKey } from '@solana/web3.js';
import {
  boolean,
  define,
  Describe,
  Infer,
  instance,
  number,
  optional,
  string,
  type,
  union,
  unknown,
} from 'superstruct';

const BufferType = define<Buffer>('Buffer', (value) => Buffer.isBuffer(value));

const ParsedAccountDataType: Describe<ParsedAccountData> = type({
  program: string(),
  parsed: unknown(),
  space: number(),
});

export type AccountInfoType = Infer<typeof AccountInfoType>;
export const AccountInfoType = type({
  executable: boolean(),
  owner: instance(PublicKey),
  lamports: number(),
  data: union([ParsedAccountDataType, BufferType]),
  rentEpoch: optional(number()),
  space: optional(number()),
});
