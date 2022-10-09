import { EpochInfo, EpochSchedule } from '@solana/web3.js';

type EpochDetailsType = {
  firstAvailableBlock: number;
  epochSchedule: EpochSchedule;
  epochInfo: EpochInfo;
  genesisHash: string;
};

export default EpochDetailsType;
