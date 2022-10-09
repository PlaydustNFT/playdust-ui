import React from 'react';
import { useRecoilValue } from 'recoil';
import SuspenseBoundary from '../../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import addressStateAtom from '../../_atoms/addressStateAtom';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import AccountDomainsRow from './AccountDomainsRow/AccountDomainsRow';
import AccountInfoRows from './AccountInfoRows';

function AccountOverviewCard() {
  const addressState = useRecoilValue(addressStateAtom);

  if (!addressState) {
    return null;
  }

  return (
    <ExplorerAccordion
      id="accountInfoOverview"
      title="Solana Account Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Address"
            value={
              <ExplorerLink
                type="address"
                to={addressState.pubkey}
                allowCopy={true}
              />
            }
          />
          {addressState.label !== undefined && (
            <ExplorerGridRow label="Address Label" value={addressState.label} />
          )}
          <SuspenseBoundary
            content={<AccountDomainsRow />}
            error={null}
            loading={null}
          />
          <SuspenseBoundary
            content={<AccountInfoRows />}
            error={null}
            loading={null}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default AccountOverviewCard;
