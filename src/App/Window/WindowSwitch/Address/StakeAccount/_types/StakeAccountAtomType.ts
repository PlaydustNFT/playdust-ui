import { StakeActivationData } from '@solana/web3.js';
import ParsedStakeAccountType from './ParsedStakeAccountType';

interface StakeAccountAtomType {
  parsed: ParsedStakeAccountType;
  stakeActivation: StakeActivationData;
}

export default StakeAccountAtomType;
