import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import ENVType from './ENVType';

interface SolanaClusterType {
  network: WalletAdapterNetwork;
  tokenRegistryENV: ENVType;
  endpoint: string;
}

export default SolanaClusterType;
