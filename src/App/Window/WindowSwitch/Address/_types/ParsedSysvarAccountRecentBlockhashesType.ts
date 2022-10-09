import { array, Infer, literal, string, type } from 'superstruct';

type RecentBlockhashesEntry = Infer<typeof RecentBlockhashesEntry>;
const RecentBlockhashesEntry = type({
  blockhash: string(),
  feeCalculator: type({
    lamportsPerSignature: string(),
  }),
});

type RecentBlockhashesInfo = Infer<typeof RecentBlockhashesInfo>;
const RecentBlockhashesInfo = array(RecentBlockhashesEntry);

type ParsedSysvarAccountRecentBlockhashesType = Infer<
  typeof ParsedSysvarAccountRecentBlockhashesType
>;
const ParsedSysvarAccountRecentBlockhashesType = type({
  type: literal('recentBlockhashes'),
  info: RecentBlockhashesInfo,
});

export default ParsedSysvarAccountRecentBlockhashesType;
