import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarRewards111111111111111111111111111111
function SysvarAccountRewardsCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'rewards') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarRewards"
      title="Sysvar: Rewards"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Validator Point Value"
            value={<>{info.validatorPointValue} lamports</>}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountRewardsCard;
