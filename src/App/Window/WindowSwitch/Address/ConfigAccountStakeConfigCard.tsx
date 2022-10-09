import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import parsedConfigAccountAtom from './_atoms/parsedConfigAccountAtom';

const MAX_SLASH_PENALTY = 2 ** 8;

function ConfigAccountStakeConfigCard() {
  const parsedConfigAccount = useRecoilValue(parsedConfigAccountAtom);

  if (!parsedConfigAccount || parsedConfigAccount.type !== 'stakeConfig') {
    return null;
  }

  const { info } = parsedConfigAccount;

  const warmupCooldownFormatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(info.warmupCooldownRate);

  const slashPenaltyFormatted = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(info.slashPenalty / MAX_SLASH_PENALTY);

  return (
    <ExplorerGrid>
      <ExplorerGridRow
        label="Warmup / Cooldown Rate"
        value={warmupCooldownFormatted}
      />
      <ExplorerGridRow label="Slash Penalty" value={slashPenaltyFormatted} />
    </ExplorerGrid>
  );
}

export default ConfigAccountStakeConfigCard;
