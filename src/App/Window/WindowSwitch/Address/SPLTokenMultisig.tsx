import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedTokenAccountAtom from './_atoms/parsedTokenAccountAtom';

// Q6XprfkF8RQQKoQVG33xT88H7wi8Uk1B1CC7YAs69Gi
function SPLTokenMultisig() {
  const parsedTokenAccount = useRecoilValue(parsedTokenAccountAtom);

  if (!parsedTokenAccount || parsedTokenAccount.type !== 'multisig') {
    return null;
  }

  const { info } = parsedTokenAccount;

  return (
    <ExplorerAccordion
      title="SPL Token Multisig Account Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Required Signers"
            value={info.numRequiredSigners}
          />
          <ExplorerGridRow label="Valid Signers" value={info.numValidSigners} />
          {info.signers.map((signer: string, idx) => (
            <ExplorerGridRow
              key={signer}
              label={`Signer ${idx + 1}`}
              value={<LabeledAddressLink to={signer} allowCopy={true} />}
            />
          ))}
        </ExplorerGrid>
      }
    />
  );
}

export default SPLTokenMultisig;
