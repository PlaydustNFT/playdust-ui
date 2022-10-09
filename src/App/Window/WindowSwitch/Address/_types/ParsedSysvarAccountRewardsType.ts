import { Infer, literal, number, type } from 'superstruct';

type RewardsInfo = Infer<typeof RewardsInfo>;
const RewardsInfo = type({
  validatorPointValue: number(),
});

type ParsedSysvarAccountRewardsType = Infer<
  typeof ParsedSysvarAccountRewardsType
>;
const ParsedSysvarAccountRewardsType = type({
  type: literal('rewards'),
  info: RewardsInfo,
});

export default ParsedSysvarAccountRewardsType;
