import ClusterType from '../_types/ClusterType';

const getLiveClusters = () => [
  ClusterType.Devnet,
  ClusterType.Testnet,
  ClusterType.MainnetBeta,
];

export default getLiveClusters;
