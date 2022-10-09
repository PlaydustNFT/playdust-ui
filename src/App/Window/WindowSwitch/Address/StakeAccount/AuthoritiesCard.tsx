import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedStakeAccountAtom from './_atoms/parsedStakeAccountAtom';

function AuthoritiesCard() {
  const parsedStakeAccount = useRecoilValue(parsedStakeAccountAtom);

  if (!parsedStakeAccount) {
    return null;
  }

  const {
    parsed: { info },
  } = parsedStakeAccount;

  const hasLockup = info.meta.lockup.unixTimestamp > 0;

  return (
    <ExplorerGrid>
      <ExplorerGridRow
        label="Stake Authority Address"
        value={
          <LabeledAddressLink
            to={info.meta.authorized.staker}
            allowCopy={true}
          />
        }
      />
      <ExplorerGridRow
        label="Withdraw Authority Address"
        value={
          <LabeledAddressLink
            to={info.meta.authorized.withdrawer}
            allowCopy={true}
          />
        }
      />
      {hasLockup && (
        <ExplorerGridRow
          label="Lockup Authority Address"
          value={
            <LabeledAddressLink
              to={info.meta.lockup.custodian}
              allowCopy={true}
            />
          }
        />
      )}
    </ExplorerGrid>
  );
}

export default AuthoritiesCard;
