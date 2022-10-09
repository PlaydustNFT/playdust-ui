import { enums, Infer } from 'superstruct';

type StakeAccountType = Infer<typeof StakeAccountType>;
const StakeAccountType = enums([
  'uninitialized',
  'initialized',
  'delegated',
  'rewardsPool',
]);

export default StakeAccountType;
