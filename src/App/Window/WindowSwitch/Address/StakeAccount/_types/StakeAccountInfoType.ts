import { Infer, nullable, number, string, type } from 'superstruct';

type StakeMeta = Infer<typeof StakeMeta>;
const StakeMeta = type({
  rentExemptReserve: string(),
  authorized: type({
    staker: string(),
    withdrawer: string(),
  }),
  lockup: type({
    unixTimestamp: number(),
    epoch: number(),
    custodian: string(),
  }),
});

type StakeAccountInfoType = Infer<typeof StakeAccountInfoType>;
const StakeAccountInfoType = type({
  meta: StakeMeta,
  stake: nullable(
    type({
      delegation: type({
        voter: string(),
        stake: string(),
        activationEpoch: string(),
        deactivationEpoch: string(),
        warmupCooldownRate: number(),
      }),
      creditsObserved: number(),
    })
  ),
});

export default StakeAccountInfoType;
