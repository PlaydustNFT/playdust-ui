import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarRent111111111111111111111111111111111
function SysvarAccountRentCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'rent') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarRent"
      title="Sysvar: Rent"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Burn Percent"
            value={<>{info.burnPercent} %</>}
          />
          <ExplorerGridRow
            label="Exemption Threshold"
            value={<>{info.exemptionThreshold} years</>}
          />
          <ExplorerGridRow
            label="Lamports Per Byte Year"
            value={info.lamportsPerByteYear}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountRentCard;
