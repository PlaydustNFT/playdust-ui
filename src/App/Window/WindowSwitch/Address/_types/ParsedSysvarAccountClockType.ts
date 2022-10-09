import { Infer, literal, number, type } from 'superstruct';

type ClockAccountInfo = Infer<typeof ClockAccountInfo>;
const ClockAccountInfo = type({
  slot: number(),
  epoch: number(),
  leaderScheduleEpoch: number(),
  unixTimestamp: number(),
});

type ParsedSysvarAccountClockType = Infer<typeof ParsedSysvarAccountClockType>;
const ParsedSysvarAccountClockType = type({
  type: literal('clock'),
  info: ClockAccountInfo,
});

export default ParsedSysvarAccountClockType;
