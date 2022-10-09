import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedBPFUpgradeableLoaderAccountAtom from './_atoms/parsedBPFUpgradeableLoaderAccountAtom';

function BPFUpgradeableLoaderAccountBuffer() {
  const parsedBPFUpgradeableLoaderAccount = useRecoilValue(
    parsedBPFUpgradeableLoaderAccountAtom
  );

  if (
    !parsedBPFUpgradeableLoaderAccount ||
    parsedBPFUpgradeableLoaderAccount.type !== 'buffer'
  ) {
    return null;
  }

  const { info } = parsedBPFUpgradeableLoaderAccount;

  return (
    <ExplorerAccordion
      id="bpf-upgradeable-loader-buffer-info"
      title="BPF Upgradeable Loader Buffer Info"
      expanded={true}
      content={
        <ExplorerGrid>
          {info.authority && (
            <ExplorerGridRow
              label="Deploy Authority"
              value={<LabeledAddressLink to={info.authority} />}
            />
          )}
        </ExplorerGrid>
      }
    />
  );
}

export default BPFUpgradeableLoaderAccountBuffer;
