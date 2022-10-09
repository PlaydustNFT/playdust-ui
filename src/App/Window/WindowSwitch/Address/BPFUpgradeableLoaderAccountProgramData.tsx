import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedBPFUpgradeableLoaderAccountAtom from './_atoms/parsedBPFUpgradeableLoaderAccountAtom';

// 72xbspJP8vtJ91Lp7k6mqJXFiPSvpad5BBRrixfAWh8m
function BPFUpgradeableLoaderAccountProgramData() {
  const parsedBPFUpgradeableLoaderAccount = useRecoilValue(
    parsedBPFUpgradeableLoaderAccountAtom
  );

  if (
    !parsedBPFUpgradeableLoaderAccount ||
    parsedBPFUpgradeableLoaderAccount.type !== 'programData'
  ) {
    return null;
  }

  const { info } = parsedBPFUpgradeableLoaderAccount;

  return (
    <ExplorerAccordion
      id="bpf-upgradeable-loader-program-data-info"
      title="BPF Upgradeable Loader Program Data Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Upgradeable"
            value={info.authority !== null ? 'Yes' : 'No'}
          />
          {info.authority !== null && (
            <ExplorerGridRow
              label="Upgrade Authority"
              value={
                <LabeledAddressLink to={info.authority} allowCopy={true} />
              }
            />
          )}
          <ExplorerGridRow
            label="Last Deployed Slot"
            value={
              <ExplorerLink type="block" to={info.slot} allowCopy={true} />
            }
          />
        </ExplorerGrid>
      }
    />
  );
}

export default BPFUpgradeableLoaderAccountProgramData;
