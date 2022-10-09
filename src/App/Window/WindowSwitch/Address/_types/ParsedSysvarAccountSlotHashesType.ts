import { array, Infer, literal, number, string, type } from 'superstruct';

type SlotHashEntry = Infer<typeof SlotHashEntry>;
const SlotHashEntry = type({
  slot: number(),
  hash: string(),
});

type SlotHashesInfo = Infer<typeof SlotHashesInfo>;
const SlotHashesInfo = array(SlotHashEntry);

type ParsedSysvarAccountSlotHashesType = Infer<
  typeof ParsedSysvarAccountSlotHashesType
>;
const ParsedSysvarAccountSlotHashesType = type({
  type: literal('slotHashes'),
  info: SlotHashesInfo,
});

export default ParsedSysvarAccountSlotHashesType;
