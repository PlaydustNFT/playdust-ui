import BN from 'bn.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import SolBalance from '../../_sharedComponents/SolBalance/SolBalance';
import parsedStakeAccountAtom from './_atoms/parsedStakeAccountAtom';
import displayStatus from './_helpers/displayStatus';
import getMaxEpoch from './_helpers/getMaxEpoch';
import isFullyInactivated from './_helpers/isFullyInactivated';

function DelegationCard() {
  const parsedStakeAccount = useRecoilValue(parsedStakeAccountAtom);

  if (!parsedStakeAccount) {
    return null;
  }

  const { parsed, stakeActivation } = parsedStakeAccount;
  const { info, type } = parsed;

  const isDelegated = type === 'delegated';

  const activation = isDelegated ? stakeActivation : undefined;

  const hideDelegation = !isDelegated || isFullyInactivated(info, activation);

  if (hideDelegation) {
    return null;
  }

  const { stake } = info;
  if (!stake) {
    return null;
  }
  const { delegation } = stake;

  const delegationActivationEpoch = new BN(delegation.activationEpoch, 10);
  const delegationDeactivationEpoch = new BN(delegation.deactivationEpoch, 10);

  let voterPubkey;
  let activationEpoch;
  let deactivationEpoch;

  if (delegation) {
    const maxEpoch = getMaxEpoch();
    voterPubkey = delegation.voter;
    if (!delegationActivationEpoch.eq(maxEpoch)) {
      activationEpoch = delegationActivationEpoch.toNumber();
    }
    if (!delegationDeactivationEpoch.eq(maxEpoch)) {
      deactivationEpoch = delegationDeactivationEpoch.toNumber();
    }
  }

  return (
    <ExplorerGrid>
      <ExplorerGridRow label="Status" value={displayStatus(type, activation)} />
      {stake && (
        <ExplorerGridRow
          label="Delegated Stake (SOL)"
          value={<SolBalance lamports={new BN(stake.delegation.stake, 10)} />}
        />
      )}
      {activation && (
        <ExplorerGridRow
          label="Active Stake (SOL)"
          value={<SolBalance lamports={activation.active} />}
        />
      )}
      {activation && (
        <ExplorerGridRow
          label="Inactive Stake (SOL)"
          value={<SolBalance lamports={activation.inactive} />}
        />
      )}
      {voterPubkey && (
        <ExplorerGridRow
          label="Delegated Vote Address"
          value={<LabeledAddressLink to={voterPubkey} allowCopy={true} />}
        />
      )}
      <ExplorerGridRow
        label="Activation Epoch"
        value={
          activationEpoch !== undefined ? (
            <ExplorerLink type="epoch" to={activationEpoch} />
          ) : (
            '-'
          )
        }
      />
      <ExplorerGridRow
        label="Deactivation Epoch"
        value={
          deactivationEpoch !== undefined ? (
            <ExplorerLink type="epoch" to={deactivationEpoch} />
          ) : (
            '-'
          )
        }
      />
    </ExplorerGrid>
  );
}

export default DelegationCard;
