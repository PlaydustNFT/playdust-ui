import { StakeActivationData } from '@solana/web3.js';
import BN from 'bn.js';
import StakeAccountInfoType from '../_types/StakeAccountInfoType';
import getMaxEpoch from './getMaxEpoch';

function isFullyInactivated(
  stakeAccount: StakeAccountInfoType,
  activation?: StakeActivationData
): boolean {
  const { stake } = stakeAccount;

  if (!stake || !activation) {
    return false;
  }

  const delegatedStake = new BN(stake.delegation.stake, 10).toNumber();
  const inactiveStake = activation.inactive;

  const maxEpoch = getMaxEpoch();

  return (
    !new BN(stake.delegation.deactivationEpoch, 10).eq(maxEpoch) &&
    delegatedStake === inactiveStake
  );
}

export default isFullyInactivated;
