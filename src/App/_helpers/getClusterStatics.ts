import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import ENVType from '../_types/ENVType';

function getClusterStatics() {
  return {
    MAINNET: {
      network: WalletAdapterNetwork.Mainnet,
      tokenRegistryENV: ENVType.MainnetBeta,
    },
    DEVNET: {
      network: WalletAdapterNetwork.Devnet,
      tokenRegistryENV: ENVType.Devnet,
    },
  };
}

export default getClusterStatics;
