import { enums, Infer, string, type } from 'superstruct';

type NonceAccountType = Infer<typeof NonceAccountType>;
const NonceAccountType = enums(['uninitialized', 'initialized']);

type NonceAccountInfo = Infer<typeof NonceAccountInfo>;
const NonceAccountInfo = type({
  authority: string(),
  blockhash: string(),
  feeCalculator: type({
    lamportsPerSignature: string(),
  }),
});

type ParsedNonceAccountType = Infer<typeof ParsedNonceAccountType>;
const ParsedNonceAccountType = type({
  type: NonceAccountType,
  info: NonceAccountInfo,
});

export default ParsedNonceAccountType;
