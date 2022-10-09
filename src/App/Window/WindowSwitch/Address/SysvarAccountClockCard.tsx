import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarC1ock11111111111111111111111111111111
function SysvarAccountClockCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'clock') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  const timestamp = info.unixTimestamp; // toLocaleString(info.unixTimestamp)

  return (
    <ExplorerAccordion
      id="sysvarClock"
      title="Sysvar: Clock"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow label="Timestamp" value={timestamp} />
          <ExplorerGridRow
            label="Epoch"
            value={
              <ExplorerLink type="epoch" to={info.epoch} allowCopy={true} />
            }
          />
          <ExplorerGridRow
            label="Leader Schedule Epoch"
            value={
              <ExplorerLink
                type="epoch"
                to={info.leaderScheduleEpoch}
                allowCopy={true}
              />
            }
          />
          <ExplorerGridRow
            label="Slot"
            value={
              <ExplorerLink type="block" to={info.slot} allowCopy={true} />
            }
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountClockCard;
