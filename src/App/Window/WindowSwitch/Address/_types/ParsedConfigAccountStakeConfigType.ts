import { Infer, literal, number, type } from 'superstruct';

type StakeConfigInfo = Infer<typeof StakeConfigInfo>;
const StakeConfigInfo = type({
  warmupCooldownRate: number(),
  slashPenalty: number(),
});

export type ParsedConfigAccountStakeConfigType = Infer<
  typeof ParsedConfigAccountStakeConfigType
>;
export const ParsedConfigAccountStakeConfigType = type({
  type: literal('stakeConfig'),
  info: StakeConfigInfo,
});
