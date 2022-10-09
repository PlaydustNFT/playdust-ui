import ClusterType from '../_types/ClusterType';

const getAllClusters = () => [
  ClusterType.Custom,
  ClusterType.Devnet,
  ClusterType.Testnet,
  ClusterType.MainnetBeta,
];

export default getAllClusters;
