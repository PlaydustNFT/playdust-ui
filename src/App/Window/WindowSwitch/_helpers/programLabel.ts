import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  BPF_LOADER_DEPRECATED_PROGRAM_ID,
  BPF_LOADER_PROGRAM_ID,
  Secp256k1Program,
  StakeProgram,
  SystemProgram,
  VOTE_PROGRAM_ID,
} from '@solana/web3.js';
import ClusterType from '../_types/ClusterType';
import getAllClusters from './getAllClusters';
import getLiveClusters from './getLiveClusters';
import getMainnetOnly from './getMainnetOnly';
import getWalletAdapterNetworkToClusterMap from './getWalletAdapterNetworkToClusterMap';

const ALL_CLUSTERS = getAllClusters();
const LIVE_CLUSTERS = getLiveClusters();
const MAINNET_ONLY = getMainnetOnly();
const walletAdapterNetworkToClusterMap = getWalletAdapterNetworkToClusterMap();

const LOADER_IDS = {
  MoveLdr111111111111111111111111111111111111: 'Move Loader',
  NativeLoader1111111111111111111111111111111: 'Native Loader',
  [BPF_LOADER_DEPRECATED_PROGRAM_ID.toBase58()]: 'BPF Loader',
  [BPF_LOADER_PROGRAM_ID.toBase58()]: 'BPF Loader 2',
  BPFLoaderUpgradeab1e11111111111111111111111: 'BPF Upgradeable Loader',
} as const;

enum ProgramNames {
  // native built-ins
  ADDRESS_MAP = 'Address Map Program',
  CONFIG = 'Config Program',
  STAKE = 'Stake Program',
  SYSTEM = 'System Program',
  VOTE = 'Vote Program',
  SECP256K1 = 'Secp256k1 Program',

  // spl
  ASSOCIATED_TOKEN = 'Associated Token Program',
  FEATURE_PROPOSAL = 'Feature Proposal Program',
  LENDING = 'Lending Program',
  MEMO = 'Memo Program',
  MEMO_2 = 'Memo Program v2',
  NAME = 'Name Service Program',
  STAKE_POOL = 'Stake Pool Program',
  SWAP = 'Swap Program',
  TOKEN = 'Token Program',
  TOKEN_METADATA = 'Token Metadata Program',
  TOKEN_VAULT = 'Token Vault Program',

  // other
  ACUMEN = 'Acumen Program',
  BONFIDA_POOL = 'Bonfida Pool Program',
  BREAK_SOLANA = 'Break Solana Program',
  MANGO_GOVERNANCE = 'Mango Governance Program',
  MANGO_ICO = 'Mango ICO Program',
  MANGO_1 = 'Mango Program v1',
  MANGO_2 = 'Mango Program v2',
  MANGO_3 = 'Mango Program v3',
  MARINADE = 'Marinade Staking Program',
  MERCURIAL = 'Mercurial Stable Swap Program',
  METAPLEX = 'Metaplex Program',
  NFT_AUCTION = 'NFT Auction Program',
  NFT_CANDY_MACHINE = 'NFT Candy Machine Program',
  ORCA_SWAP_1 = 'Orca Swap Program v1',
  ORCA_SWAP_2 = 'Orca Swap Program v2',
  ORCA_AQUAFARM = 'Orca Aquafarm Program',
  PORT = 'Port Finance Program',
  PYTH = 'Pyth Oracle Program',
  QUARRY_MERGE_MINE = 'Quarry Merge Mine',
  QUARRY_MINE = 'Quarry Mine',
  QUARRY_MINT_WRAPPER = 'Quarry Mint Wrapper',
  QUARRY_REDEEMER = 'Quarry Redeemer',
  QUARRY_REGISTRY = 'Quarry Registry',
  RAYDIUM_AMM = 'Raydium AMM Program',
  RAYDIUM_IDO = 'Raydium IDO Program',
  RAYDIUM_LP_1 = 'Raydium Liquidity Pool Program v1',
  RAYDIUM_LP_2 = 'Raydium Liquidity Pool Program v2',
  RAYDIUM_STAKING = 'Raydium Staking Program',
  SABER_ROUTER = 'Saber Router Program',
  SABER_SWAP = 'Saber Stable Swap Program',
  SERUM_1 = 'Serum Dex Program v1',
  SERUM_2 = 'Serum Dex Program v2',
  SERUM_3 = 'Serum Dex Program v3',
  SERUM_SWAP = 'Serum Swap Program',
  SOLEND = 'Solend Program',
  SOLIDO = 'Lido for Solana Program',
  STEP_SWAP = 'Step Finance Swap Program',
  SWITCHBOARD = 'Switchboard Oracle Program',
  WORMHOLE = 'Wormhole',
}

const PROGRAM_DEPLOYMENTS = {
  // native built-ins
  [ProgramNames.ADDRESS_MAP]: ALL_CLUSTERS,
  [ProgramNames.CONFIG]: ALL_CLUSTERS,
  [ProgramNames.STAKE]: ALL_CLUSTERS,
  [ProgramNames.SYSTEM]: ALL_CLUSTERS,
  [ProgramNames.VOTE]: ALL_CLUSTERS,
  [ProgramNames.SECP256K1]: ALL_CLUSTERS,

  // spl
  [ProgramNames.ASSOCIATED_TOKEN]: ALL_CLUSTERS,
  [ProgramNames.FEATURE_PROPOSAL]: ALL_CLUSTERS,
  [ProgramNames.LENDING]: LIVE_CLUSTERS,
  [ProgramNames.MEMO]: ALL_CLUSTERS,
  [ProgramNames.MEMO_2]: ALL_CLUSTERS,
  [ProgramNames.NAME]: LIVE_CLUSTERS,
  [ProgramNames.STAKE_POOL]: LIVE_CLUSTERS,
  [ProgramNames.SWAP]: LIVE_CLUSTERS,
  [ProgramNames.TOKEN]: ALL_CLUSTERS,
  [ProgramNames.TOKEN_METADATA]: LIVE_CLUSTERS,
  [ProgramNames.TOKEN_VAULT]: LIVE_CLUSTERS,

  // other
  [ProgramNames.ACUMEN]: MAINNET_ONLY,
  [ProgramNames.BONFIDA_POOL]: MAINNET_ONLY,
  [ProgramNames.BREAK_SOLANA]: LIVE_CLUSTERS,
  [ProgramNames.MANGO_GOVERNANCE]: MAINNET_ONLY,
  [ProgramNames.MANGO_ICO]: MAINNET_ONLY,
  [ProgramNames.MANGO_1]: MAINNET_ONLY,
  [ProgramNames.MANGO_2]: MAINNET_ONLY,
  [ProgramNames.MANGO_3]: MAINNET_ONLY,
  [ProgramNames.MARINADE]: MAINNET_ONLY,
  [ProgramNames.MERCURIAL]: [
    ClusterType.Devnet,
    ClusterType.MainnetBeta,
  ] as ClusterType[],
  [ProgramNames.METAPLEX]: LIVE_CLUSTERS,
  [ProgramNames.NFT_AUCTION]: LIVE_CLUSTERS,
  [ProgramNames.NFT_CANDY_MACHINE]: LIVE_CLUSTERS,
  [ProgramNames.ORCA_SWAP_1]: MAINNET_ONLY,
  [ProgramNames.ORCA_SWAP_2]: MAINNET_ONLY,
  [ProgramNames.ORCA_AQUAFARM]: MAINNET_ONLY,
  [ProgramNames.PORT]: MAINNET_ONLY,
  [ProgramNames.PYTH]: MAINNET_ONLY,
  [ProgramNames.QUARRY_MERGE_MINE]: LIVE_CLUSTERS,
  [ProgramNames.QUARRY_MINE]: LIVE_CLUSTERS,
  [ProgramNames.QUARRY_MINT_WRAPPER]: LIVE_CLUSTERS,
  [ProgramNames.QUARRY_REDEEMER]: LIVE_CLUSTERS,
  [ProgramNames.QUARRY_REGISTRY]: LIVE_CLUSTERS,
  [ProgramNames.RAYDIUM_AMM]: MAINNET_ONLY,
  [ProgramNames.RAYDIUM_IDO]: MAINNET_ONLY,
  [ProgramNames.RAYDIUM_LP_1]: MAINNET_ONLY,
  [ProgramNames.RAYDIUM_LP_2]: MAINNET_ONLY,
  [ProgramNames.RAYDIUM_STAKING]: MAINNET_ONLY,
  [ProgramNames.SABER_ROUTER]: [
    ClusterType.Devnet,
    ClusterType.MainnetBeta,
  ] as ClusterType[],
  [ProgramNames.SABER_SWAP]: [
    ClusterType.Devnet,
    ClusterType.MainnetBeta,
  ] as ClusterType[],
  [ProgramNames.SERUM_1]: MAINNET_ONLY,
  [ProgramNames.SERUM_2]: MAINNET_ONLY,
  [ProgramNames.SERUM_3]: MAINNET_ONLY,
  [ProgramNames.SERUM_SWAP]: MAINNET_ONLY,
  [ProgramNames.SOLEND]: MAINNET_ONLY,
  [ProgramNames.SOLIDO]: MAINNET_ONLY,
  [ProgramNames.STEP_SWAP]: MAINNET_ONLY,
  [ProgramNames.SWITCHBOARD]: MAINNET_ONLY,
  [ProgramNames.WORMHOLE]: MAINNET_ONLY,
} as const;

const PROGRAM_NAME_BY_ID = {
  // native built-ins
  AddressMap111111111111111111111111111111111: ProgramNames.ADDRESS_MAP,
  Config1111111111111111111111111111111111111: ProgramNames.CONFIG,
  [StakeProgram.programId.toBase58()]: ProgramNames.STAKE,
  [SystemProgram.programId.toBase58()]: ProgramNames.SYSTEM,
  [VOTE_PROGRAM_ID.toBase58()]: ProgramNames.VOTE,
  [Secp256k1Program.programId.toBase58()]: ProgramNames.SECP256K1,

  // spl
  ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: ProgramNames.ASSOCIATED_TOKEN,
  Feat1YXHhH6t1juaWF74WLcfv4XoNocjXA6sPWHNgAse: ProgramNames.FEATURE_PROPOSAL,
  LendZqTs7gn5CTSJU1jWKhKuVpjJGom45nnwPb2AMTi: ProgramNames.LENDING,
  Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo: ProgramNames.MEMO,
  MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr: ProgramNames.MEMO_2,
  namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX: ProgramNames.NAME,
  SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy: ProgramNames.STAKE_POOL,
  SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8: ProgramNames.SWAP,
  TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: ProgramNames.TOKEN,
  metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s: ProgramNames.TOKEN_METADATA,
  vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn: ProgramNames.TOKEN_VAULT,

  // other
  C64kTdg1Hzv5KoQmZrQRcm2Qz7PkxtFBgw7EpFhvYn8W: ProgramNames.ACUMEN,
  WvmTNLpGMVbwJVYztYL4Hnsy82cJhQorxjnnXcRm3b6: ProgramNames.BONFIDA_POOL,
  BrEAK7zGZ6dM71zUDACDqJnekihmwF15noTddWTsknjC: ProgramNames.BREAK_SOLANA,
  GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J: ProgramNames.MANGO_GOVERNANCE,
  '7sPptkymzvayoSbLXzBsXEF8TSf3typNnAWkrKrDizNb': ProgramNames.MANGO_ICO,
  JD3bq9hGdy38PuWQ4h2YJpELmHVGPPfFSuFkpzAd9zfu: ProgramNames.MANGO_1,
  '5fNfvyp5czQVX77yoACa3JJVEhdRaWjPuazuWgjhTqEH': ProgramNames.MANGO_2,
  mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68: ProgramNames.MANGO_3,
  MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD: ProgramNames.MARINADE,
  MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky: ProgramNames.MERCURIAL,
  p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98: ProgramNames.METAPLEX,
  auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8: ProgramNames.NFT_AUCTION,
  cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ: ProgramNames.NFT_CANDY_MACHINE,
  DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1: ProgramNames.ORCA_SWAP_1,
  '9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP': ProgramNames.ORCA_SWAP_2,
  '82yxjeMsvaURa4MbZZ7WZZHfobirZYkH1zF8fmeGtyaQ': ProgramNames.ORCA_AQUAFARM,
  Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR: ProgramNames.PORT,
  FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH: ProgramNames.PYTH,
  QMMD16kjauP5knBwxNUJRZ1Z5o3deBuFrqVjBVmmqto: ProgramNames.QUARRY_MERGE_MINE,
  QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB: ProgramNames.QUARRY_MINE,
  QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV: ProgramNames.QUARRY_MINT_WRAPPER,
  QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9: ProgramNames.QUARRY_REDEEMER,
  QREGBnEj9Sa5uR91AV8u3FxThgP5ZCvdZUW2bHAkfNc: ProgramNames.QUARRY_REGISTRY,
  '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8': ProgramNames.RAYDIUM_AMM,
  '9HzJyW1qZsEiSfMUf6L2jo3CcTKAyBmSyKdwQeYisHrC': ProgramNames.RAYDIUM_IDO,
  RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr: ProgramNames.RAYDIUM_LP_1,
  '27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv': ProgramNames.RAYDIUM_LP_2,
  EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q: ProgramNames.RAYDIUM_STAKING,
  Crt7UoUR6QgrFrN7j8rmSQpUTNWNSitSwWvsWGf1qZ5t: ProgramNames.SABER_ROUTER,
  SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ: ProgramNames.SABER_SWAP,
  BJ3jrUzddfuSrZHXSCxMUUQsjKEyLmuuyZebkcaFp2fg: ProgramNames.SERUM_1,
  EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o: ProgramNames.SERUM_2,
  '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin': ProgramNames.SERUM_3,
  '22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD': ProgramNames.SERUM_SWAP,
  So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo: ProgramNames.SOLEND,
  CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi: ProgramNames.SOLIDO,
  SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1: ProgramNames.STEP_SWAP,
  DtmE9D2CSB4L5D6A15mraeEjrGMm6auWVzgaD8hK2tZM: ProgramNames.SWITCHBOARD,
  WormT3McKhFJ2RkiGpdw9GKvNCrB2aB54gb2uV9MfQC: ProgramNames.WORMHOLE,
} as const;

function programLabel(
  address: string,
  walletAdapterNetwork: WalletAdapterNetwork
): string | undefined {
  const cluster = walletAdapterNetworkToClusterMap[walletAdapterNetwork];
  const programName = PROGRAM_NAME_BY_ID[address];
  if (programName && PROGRAM_DEPLOYMENTS[programName].includes(cluster)) {
    return programName;
  }

  return LOADER_IDS[address];
}

export default programLabel;
