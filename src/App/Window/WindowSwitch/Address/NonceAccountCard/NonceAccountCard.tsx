import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedNonceAccountAtom from './_atoms/parsedNonceAccountAtom';

// TODO: Add address
function NonceAccountCard() {
  const parsedNonceAccount = useRecoilValue(parsedNonceAccountAtom);

  if (!parsedNonceAccount) {
    return null;
  }

  const { info } = parsedNonceAccount;

  return (
    <ExplorerGrid>
      <ExplorerGridRow
        label="Authority"
        value={<LabeledAddressLink to={info.authority} allowCopy={true} />}
      />
      <ExplorerGridRow
        label="Blockhash"
        value={<code>{info.blockhash}</code>}
      />
      <ExplorerGridRow
        label="Fee"
        value={`${info.feeCalculator.lamportsPerSignature} lamports per signature`}
      />
    </ExplorerGrid>
  );
}

export default NonceAccountCard;
