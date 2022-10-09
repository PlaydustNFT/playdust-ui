import { array, Infer, literal, number, type } from 'superstruct';

type StakeHistoryEntryItem = Infer<typeof StakeHistoryEntryItem>;
const StakeHistoryEntryItem = type({
  effective: number(),
  activating: number(),
  deactivating: number(),
});

type StakeHistoryEntry = Infer<typeof StakeHistoryEntry>;
const StakeHistoryEntry = type({
  epoch: number(),
  stakeHistory: StakeHistoryEntryItem,
});

type StakeHistoryInfo = Infer<typeof StakeHistoryInfo>;
const StakeHistoryInfo = array(StakeHistoryEntry);

type ParsedSysvarAccountStakeHistoryType = Infer<
  typeof ParsedSysvarAccountStakeHistoryType
>;
const ParsedSysvarAccountStakeHistoryType = type({
  type: literal('stakeHistory'),
  info: StakeHistoryInfo,
});

export default ParsedSysvarAccountStakeHistoryType;
