import {
  Secp256k1Program,
  StakeProgram,
  SystemProgram,
  VOTE_PROGRAM_ID,
} from '@solana/web3.js'

export enum PROGRAM_NAMES {
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
}

export const PROGRAM_NAME_BY_ID = {
  // native built-ins
  AddressMap111111111111111111111111111111111: PROGRAM_NAMES.ADDRESS_MAP,
  Config1111111111111111111111111111111111111: PROGRAM_NAMES.CONFIG,
  [StakeProgram.programId.toBase58()]: PROGRAM_NAMES.STAKE,
  [SystemProgram.programId.toBase58()]: PROGRAM_NAMES.SYSTEM,
  [VOTE_PROGRAM_ID.toBase58()]: PROGRAM_NAMES.VOTE,
  [Secp256k1Program.programId.toBase58()]: PROGRAM_NAMES.SECP256K1,

  // spl
  ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL: PROGRAM_NAMES.ASSOCIATED_TOKEN,
  Feat1YXHhH6t1juaWF74WLcfv4XoNocjXA6sPWHNgAse: PROGRAM_NAMES.FEATURE_PROPOSAL,
  LendZqTs7gn5CTSJU1jWKhKuVpjJGom45nnwPb2AMTi: PROGRAM_NAMES.LENDING,
  Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo: PROGRAM_NAMES.MEMO,
  MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr: PROGRAM_NAMES.MEMO_2,
  namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX: PROGRAM_NAMES.NAME,
  SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy: PROGRAM_NAMES.STAKE_POOL,
  SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8: PROGRAM_NAMES.SWAP,
  TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA: PROGRAM_NAMES.TOKEN,
  metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s: PROGRAM_NAMES.TOKEN_METADATA,
  vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn: PROGRAM_NAMES.TOKEN_VAULT,
}
