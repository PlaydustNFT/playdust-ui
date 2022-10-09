import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import ClusterType from '../_types/ClusterType';

const getWalletAdapterNetworkToClusterMap = (): Record<
  WalletAdapterNetwork,
  ClusterType
> => ({
  [WalletAdapterNetwork.Mainnet]: ClusterType.MainnetBeta,
  [WalletAdapterNetwork.Testnet]: ClusterType.Testnet,
  [WalletAdapterNetwork.Devnet]: ClusterType.Devnet,
});

export default getWalletAdapterNetworkToClusterMap;
