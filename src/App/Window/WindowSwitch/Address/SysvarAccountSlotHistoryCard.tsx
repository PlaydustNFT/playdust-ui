import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';

// SysvarS1otHistory11111111111111111111111111
function SysvarAccountSlotHistoryCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'slotHistory') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  const history = Array.from(
    {
      length: 100,
    },
    (v, k) => info.nextSlot - k
  );

  return (
    <ExplorerAccordion
      id="sysvarSlotHistory"
      title="Sysvar: Slot History"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Slot History (previous 100 slots)"
            value={
              <>
                {history.map((val) => (
                  <>
                    <ExplorerLink
                      type="block"
                      key={val}
                      to={val}
                      allowCopy={true}
                    />
                    <br />
                  </>
                ))}
              </>
            }
          />
        </ExplorerGrid>
      }
    />
  );
}

export default SysvarAccountSlotHistoryCard;
