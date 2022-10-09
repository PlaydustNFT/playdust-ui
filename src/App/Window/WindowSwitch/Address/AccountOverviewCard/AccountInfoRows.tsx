import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import SolBalance from '../../_sharedComponents/SolBalance/SolBalance';
import accountInfoAtom from '../_atoms/accountInfoAtom';

function AccountInfoRows() {
  const accountInfo = useRecoilValue(accountInfoAtom);
  if (accountInfo === null) {
    return null;
  }
  return (
    <>
      <ExplorerGridRow
        label="Balance (SOL)"
        value={<SolBalance lamports={accountInfo.lamports ?? 0} />}
      />
      {accountInfo.space !== undefined && (
        <ExplorerGridRow
          label="Allocated Data Size"
          value={`${accountInfo.space} byte(s)`}
        />
      )}
      {accountInfo.owner && (
        <ExplorerGridRow
          label="Assigned Program Id"
          value={<LabeledAddressLink to={accountInfo.owner} />}
        />
      )}
      <ExplorerGridRow
        label="Executable"
        value={accountInfo.executable ? 'Yes' : 'No'}
      />
    </>
  );
}

export default AccountInfoRows;
