import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarEpochSchedu1e111111111111111111111111
function SysvarAccountEpochScheduleCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'epochSchedule') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarEpochSchedule"
      title="Sysvar: Epoch Schedule"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow label="Slots Per Epoch" value={info.slotsPerEpoch} />
          <ExplorerGridRow
            label="Leader Schedule Slot Offset"
            value={info.leaderScheduleSlotOffset}
          />
          <ExplorerGridRow
            label="Epoch Warmup Enabled"
            value={<code>{info.warmup ? 'true' : 'false'}</code>}
          />
          <ExplorerGridRow
            label="First Normal Epoch"
            value={info.firstNormalEpoch}
          />
          <ExplorerGridRow
            label="First Normal Slot"
            value={<ExplorerLink type="block" to={info.firstNormalSlot} />}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountEpochScheduleCard;
