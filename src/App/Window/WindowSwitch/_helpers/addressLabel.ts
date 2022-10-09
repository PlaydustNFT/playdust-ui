import type { TokenInfoMap } from '@solana/spl-token-registry';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_REWARDS_PUBKEY,
  SYSVAR_STAKE_HISTORY_PUBKEY,
} from '@solana/web3.js';
import getWalletAdapterNetworkToClusterMap from './getWalletAdapterNetworkToClusterMap';
import programLabel from './programLabel';
import serumMarketRegistry from './serumMarketRegistry';

const walletAdapterNetworkToClusterMap = getWalletAdapterNetworkToClusterMap();

const SPECIAL_IDS: { [key: string]: string } = {
  '1nc1nerator11111111111111111111111111111111': 'Incinerator',
  Sysvar1111111111111111111111111111111111111: 'SYSVAR',
};

const SYSVAR_IDS = {
  [SYSVAR_CLOCK_PUBKEY.toBase58()]: 'Sysvar: Clock',
  SysvarEpochSchedu1e111111111111111111111111: 'Sysvar: Epoch Schedule',
  SysvarFees111111111111111111111111111111111: 'Sysvar: Fees',
  SysvarRecentB1ockHashes11111111111111111111: 'Sysvar: Recent Blockhashes',
  [SYSVAR_RENT_PUBKEY.toBase58()]: 'Sysvar: Rent',
  [SYSVAR_REWARDS_PUBKEY.toBase58()]: 'Sysvar: Rewards',
  SysvarS1otHashes111111111111111111111111111: 'Sysvar: Slot Hashes',
  SysvarS1otHistory11111111111111111111111111: 'Sysvar: Slot History',
  [SYSVAR_STAKE_HISTORY_PUBKEY.toBase58()]: 'Sysvar: Stake History',
  Sysvar1nstructions1111111111111111111111111: 'Sysvar: Instructions',
};

function tokenLabel(
  address: string,
  tokenRegistry?: TokenInfoMap
): string | undefined {
  if (!tokenRegistry) return;
  const tokenInfo = tokenRegistry.get(address);
  if (!tokenInfo) return;
  if (tokenInfo.name === tokenInfo.symbol) {
    return tokenInfo.name;
  }
  return `${tokenInfo.symbol} - ${tokenInfo.name}`;
}

function addressLabel(
  address: string,
  walletAdapterNetwork: WalletAdapterNetwork,
  tokenRegistry?: TokenInfoMap
): string | undefined {
  const cluster = walletAdapterNetworkToClusterMap[walletAdapterNetwork];
  return (
    programLabel(address, walletAdapterNetwork) ||
    SYSVAR_IDS[address] ||
    SPECIAL_IDS[address] ||
    tokenLabel(address, tokenRegistry) ||
    serumMarketRegistry(address, cluster)
  );
}

export default addressLabel;
