import { Connection } from '@solana/web3.js';
import { selector } from 'recoil';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import EpochDetailsType from '../_types/EpochDetailsType';

const epochDetailsAtom = selector<EpochDetailsType>({
  key: 'epochDetails',
  get: async ({ get }) => {
    const cluster = get(solanaClusterAtom);

    const { endpoint } = cluster;

    const connection = new Connection(endpoint);

    const [firstAvailableBlock, epochSchedule, epochInfo, genesisHash] =
      await Promise.all([
        connection.getFirstAvailableBlock(),
        connection.getEpochSchedule(),
        connection.getEpochInfo(),
        connection.getGenesisHash(),
      ]);

    const data = {
      firstAvailableBlock,
      epochSchedule,
      epochInfo,
      genesisHash,
    };

    // TODO: assert using superstruct that the values returned from Promise.all
    // runtime validate. Note: getEpochStructure returns a class, which may
    // require some wrangling.

    return data;
  },
});

export default epochDetailsAtom;
