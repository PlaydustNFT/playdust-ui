import { Connection } from '@solana/web3.js';
import { selector } from 'recoil';
import { assert } from 'superstruct';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import EpochExplorerType from '../_types/EpochExplorerType';
import epochDetailsAtom from './epochDetailsAtom';

const epochStateAtom = selector<EpochExplorerType | null>({
  key: 'epochState',
  get: async ({ get }) => {
    const windowState = get(windowStateAtom);

    if (windowState?.type !== 'epoch') {
      return null;
    }

    const { state } = windowState;

    const epoch = Number(state);

    const cluster = get(solanaClusterAtom);

    const { endpoint } = cluster;

    const { epochSchedule, epochInfo } = get(epochDetailsAtom);

    const { epoch: currentEpoch } = epochInfo;

    const connection = new Connection(endpoint, 'confirmed');

    const firstSlot = epochSchedule.getFirstSlotInEpoch(epoch);
    const lastSlot = epochSchedule.getLastSlotInEpoch(epoch);
    const [firstBlock, lastBlock] = await Promise.all([
      (async () => {
        const firstBlocks = await connection.getBlocks(
          firstSlot,
          firstSlot + 100
        );
        return firstBlocks.shift();
      })(),
      (async () => {
        const lastBlocks = await connection.getBlocks(
          Math.max(0, lastSlot - 100),
          lastSlot
        );
        return lastBlocks.pop();
      })(),
    ]);

    if (firstBlock === undefined) {
      throw new Error(
        `failed to find confirmed block at start of epoch ${epoch}`
      );
    } else if (epoch < currentEpoch && lastBlock === undefined) {
      throw new Error(
        `failed to find confirmed block at end of epoch ${epoch}`
      );
    }

    const [firstTimestamp, lastTimestamp] = await Promise.all([
      connection.getBlockTime(firstBlock),
      lastBlock ? connection.getBlockTime(lastBlock) : null,
    ]);

    const data = {
      epoch,
      currentEpoch,
      firstSlot,
      lastSlot,
      firstBlock,
      firstTimestamp,
      lastBlock,
      lastTimestamp,
    };

    assert(data, EpochExplorerType);

    return data;
  },
});

export default epochStateAtom;
