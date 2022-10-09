import { boolean, Infer, literal, number, type } from 'superstruct';

type EpochScheduleInfo = Infer<typeof EpochScheduleInfo>;
const EpochScheduleInfo = type({
  slotsPerEpoch: number(),
  leaderScheduleSlotOffset: number(),
  warmup: boolean(),
  firstNormalEpoch: number(),
  firstNormalSlot: number(),
});

type ParsedSysvarAccountEpochScheduleType = Infer<
  typeof ParsedSysvarAccountEpochScheduleType
>;
const ParsedSysvarAccountEpochScheduleType = type({
  type: literal('epochSchedule'),
  info: EpochScheduleInfo,
});

export default ParsedSysvarAccountEpochScheduleType;
