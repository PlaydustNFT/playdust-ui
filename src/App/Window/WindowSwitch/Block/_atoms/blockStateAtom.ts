import { Connection, PublicKey } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import BlockExplorerType from '../_types/BlockExplorerType';

const blockStateAtom = selector<BlockExplorerType | null>({
  key: 'blockState',
  get: async ({ get }) => {
    const windowState = get(windowStateAtom);

    if (windowState?.type !== 'block') {
      return null;
    }

    const { state } = windowState;

    const slot = Number(state);

    const { endpoint } = get(solanaClusterAtom);

    const connection = new Connection(endpoint, 'confirmed');

    const block = await connection.getBlock(slot);

    if (block === null) {
      return null;
    }

    const childSlot = (
      await connection.getBlocks(slot + 1, slot + 100)
    ).shift();
    const firstLeaderSlot = block.parentSlot;

    let leaders: PublicKey[] = [];
    try {
      const lastLeaderSlot = childSlot !== undefined ? childSlot : slot;
      const slotLeadersLimit = lastLeaderSlot - block.parentSlot + 1;
      leaders = await connection.getSlotLeaders(
        firstLeaderSlot,
        slotLeadersLimit
      );
    } catch (err) {
      // ignore errors
    }

    const getLeader = (slotNumber: number) =>
      leaders.at(slotNumber - firstLeaderSlot);

    return {
      slot,
      block,
      blockLeader: getLeader(slot),
      childSlot,
      childLeader: childSlot !== undefined ? getLeader(childSlot) : undefined,
      parentLeader: getLeader(block.parentSlot),
    };
  },
});

export default blockStateAtom;
