import { Infer, nullable, number, optional, type } from 'superstruct';

type EpochExplorerType = Infer<typeof EpochExplorerType>;
const EpochExplorerType = type({
  epoch: number(),
  currentEpoch: number(),
  firstSlot: number(),
  lastSlot: number(),
  firstBlock: number(),
  firstTimestamp: nullable(number()),
  lastBlock: optional(number()),
  lastTimestamp: nullable(number()),
});

export default EpochExplorerType;
