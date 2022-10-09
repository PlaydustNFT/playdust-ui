import { Infer, literal, string, type } from 'superstruct';

type FeesInfo = Infer<typeof FeesInfo>;
const FeesInfo = type({
  feeCalculator: type({
    lamportsPerSignature: string(),
  }),
});

type ParsedSysvarAccountFeesType = Infer<typeof ParsedSysvarAccountFeesType>;
const ParsedSysvarAccountFeesType = type({
  type: literal('fees'),
  info: FeesInfo,
});

export default ParsedSysvarAccountFeesType;
