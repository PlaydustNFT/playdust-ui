import { BlockResponse, PublicKey } from '@solana/web3.js';

interface BlockExplorerType {
  slot: number;
  block: BlockResponse;
  blockLeader?: PublicKey;
  childSlot?: number;
  childLeader?: PublicKey;
  parentLeader?: PublicKey;
}

export default BlockExplorerType;
