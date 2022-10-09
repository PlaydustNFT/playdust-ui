import { Infer, union } from 'superstruct';
import ParsedSysvarAccountClockType from './ParsedSysvarAccountClockType';
import ParsedSysvarAccountEpochScheduleType from './ParsedSysvarAccountEpochScheduleType';
import ParsedSysvarFeesType from './ParsedSysvarAccountFeesType';
import ParsedSysvarAccountRecentBlockhashesType from './ParsedSysvarAccountRecentBlockhashesType';
import ParsedSysvarAccountRentType from './ParsedSysvarAccountRentType';
import ParsedSysvarAccountRewardsType from './ParsedSysvarAccountRewardsType';
import ParsedSysvarAccountSlotHashesType from './ParsedSysvarAccountSlotHashesType';
import ParsedSysvarAccountSlotHistoryType from './ParsedSysvarAccountSlotHistoryType';
import ParsedSysvarAccountStakeHistoryType from './ParsedSysvarAccountStakeHistoryType';

type ParsedSysvarAccountType = Infer<typeof ParsedSysvarAccountType>;
const ParsedSysvarAccountType = union([
  ParsedSysvarAccountSlotHashesType,
  ParsedSysvarAccountStakeHistoryType,
  ParsedSysvarAccountClockType,
  ParsedSysvarAccountEpochScheduleType,
  ParsedSysvarFeesType,
  ParsedSysvarAccountRecentBlockhashesType,
  ParsedSysvarAccountRentType,
  ParsedSysvarAccountRewardsType,
  ParsedSysvarAccountSlotHistoryType,
]);

export default ParsedSysvarAccountType;
