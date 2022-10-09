import BN from 'bn.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import SolBalance from '../../_sharedComponents/SolBalance/SolBalance';
import parsedStakeAccountAtom from './_atoms/parsedStakeAccountAtom';
import displayStatus from './_helpers/displayStatus';
import isFullyInactivated from './_helpers/isFullyInactivated';

function OverviewCard() {
  const parsedStakeAccount = useRecoilValue(parsedStakeAccountAtom);

  if (!parsedStakeAccount) {
    return null;
  }

  const { parsed, stakeActivation } = parsedStakeAccount;
  const { info, type } = parsed;

  const isDelegated = type === 'delegated';

  const activation = isDelegated ? stakeActivation : undefined;

  const hideDelegation = !isDelegated || isFullyInactivated(info, activation);

  return (
    <ExplorerGrid>
      <ExplorerGridRow
        label="Rent Reserve (SOL)"
        value={
          <SolBalance lamports={new BN(info.meta.rentExemptReserve, 10)} />
        }
      />
      {hideDelegation && (
        <ExplorerGridRow
          label="Status"
          value={
            isFullyInactivated(info, activation)
              ? 'Not delegated'
              : displayStatus(type, activation)
          }
        />
      )}
    </ExplorerGrid>
  );
}

export default OverviewCard;
