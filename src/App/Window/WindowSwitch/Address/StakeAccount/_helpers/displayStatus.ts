import { StakeActivationData } from '@solana/web3.js';
import StakeAccountType from '../_types/StakeAccountType';

const TYPE_NAMES: Record<string, string> = {
  uninitialized: 'Uninitialized',
  initialized: 'Initialized',
  delegated: 'Delegated',
  rewardsPool: 'RewardsPool',
};

function displayStatus(
  stakeAccountType?: StakeAccountType,
  activation?: StakeActivationData
) {
  if (!stakeAccountType) {
    return 'Unknown';
  }
  let status = TYPE_NAMES[stakeAccountType];
  let activationState = '';
  if (stakeAccountType !== 'delegated') {
    status = 'Not delegated';
  } else {
    activationState = activation ? `(${activation.state})` : '';
  }

  return [status, activationState].join(' ');
}

export default displayStatus;
