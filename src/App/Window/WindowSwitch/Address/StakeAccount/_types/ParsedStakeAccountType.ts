import { Infer, type } from 'superstruct';
import StakeAccountInfoType from './StakeAccountInfoType';
import StakeAccountType from './StakeAccountType';

type ParsedStakeAccountType = Infer<typeof ParsedStakeAccountType>;
const ParsedStakeAccountType = type({
  type: StakeAccountType,
  info: StakeAccountInfoType,
});

export default ParsedStakeAccountType;
