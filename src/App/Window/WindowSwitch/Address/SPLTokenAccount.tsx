import { BigNumber } from 'bignumber.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import tokenRegistryAtom from '../_atoms/tokenRegistryAtom';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedTokenAccountAtom from './_atoms/parsedTokenAccountAtom';

// DNiJ7fmPKDNNMXTAmiWKDTwgHdWW6KUuTZcEyP1Pmh4j
function SPLTokenAccount() {
  const parsedTokenAccount = useRecoilValue(parsedTokenAccountAtom);
  const tokenRegistry = useRecoilValue(tokenRegistryAtom);

  if (!parsedTokenAccount || parsedTokenAccount.type !== 'account') {
    return null;
  }

  const { info } = parsedTokenAccount;

  let unit;
  let balance;
  if (info.isNative) {
    unit = 'SOL';
    balance = (
      <>
        ◎<pre>{new BigNumber(info.tokenAmount.uiAmountString).toFormat(9)}</pre>
      </>
    );
  } else {
    balance = info.tokenAmount.uiAmountString;
    unit = tokenRegistry.get(info.mint)?.symbol || 'tokens';
  }

  return (
    <ExplorerAccordion
      id="splTokenAccountInfo"
      title="SPL Token Account"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Mint"
            value={<LabeledAddressLink to={info.mint} allowCopy={true} />}
          />
          <ExplorerGridRow
            label="Owner"
            value={<LabeledAddressLink to={info.owner} allowCopy={true} />}
          />
          <ExplorerGridRow label={`Token balance (${unit})`} value={balance} />
          {info.state === 'uninitialized' && (
            <ExplorerGridRow label="Status" value="Uninitialized" />
          )}
          {info.rentExemptReserve && (
            <ExplorerGridRow
              label="Rent-exempt reserve (SOL)"
              value={new BigNumber(
                info.rentExemptReserve.uiAmountString
              ).toFormat(9)}
            />
          )}
        </ExplorerGrid>
      }
    />
  );
}

export default SPLTokenAccount;
