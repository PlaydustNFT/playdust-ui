import { Infer, literal, number, string, type } from 'superstruct';

type SlotHistoryInfo = Infer<typeof SlotHistoryInfo>;
const SlotHistoryInfo = type({
  nextSlot: number(),
  bits: string(),
});

type ParsedSysvarAccountSlotHistoryType = Infer<
  typeof ParsedSysvarAccountSlotHistoryType
>;
const ParsedSysvarAccountSlotHistoryType = type({
  type: literal('slotHistory'),
  info: SlotHistoryInfo,
});

export default ParsedSysvarAccountSlotHistoryType;
