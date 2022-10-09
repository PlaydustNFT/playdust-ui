import { Infer, literal, number, string, type } from 'superstruct';

type RentInfo = Infer<typeof RentInfo>;
const RentInfo = type({
  lamportsPerByteYear: string(),
  exemptionThreshold: number(),
  burnPercent: number(),
});

type ParsedSysvarAccountRentType = Infer<typeof ParsedSysvarAccountRentType>;
const ParsedSysvarAccountRentType = type({
  type: literal('rent'),
  info: RentInfo,
});

export default ParsedSysvarAccountRentType;
