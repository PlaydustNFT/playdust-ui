import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarFees111111111111111111111111111111111
function SysvarAccountFeesCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'fees') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarFees"
      title="Sysvar: Fees"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Lamports Per Signature"
            value={info.feeCalculator.lamportsPerSignature}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountFeesCard;
