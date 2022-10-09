import { selector } from 'recoil';
import { assert, literal, string, union } from 'superstruct';
import getClusterStatics from '../_helpers/getClusterStatics';
import type SolanaClusterType from '../_types/SolanaClusterType';

const cluster = process.env.RPC_NODE_CLUSTER;
const endpoint = process.env.RPC_NODE_URL;

const solanaClusterAtom = selector<SolanaClusterType>({
  key: 'solanaClusterAtom',
  get: () => {
    assert(cluster, union([literal('MAINNET'), literal('DEVNET')]));
    assert(endpoint, string());

    const clusterStatics = getClusterStatics();

    const solanaCluster: SolanaClusterType = {
      ...clusterStatics[cluster],
      endpoint,
    };
    return solanaCluster;
  },
});

export default solanaClusterAtom;
