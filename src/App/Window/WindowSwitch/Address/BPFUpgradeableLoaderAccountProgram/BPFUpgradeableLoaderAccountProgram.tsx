import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import LastVerifiedBuildLabel from './LastVerifiedBuildLabel';
import SecurityLabel from './SecurityLabel';
import SecurityTXTBadge from './SecurityTXTBadge';
import VerifiedBadge from './VerifiedBadge';
import parsedBPFUpgradeableLoaderAccountProgramAtom from './_atoms/parsedBPFUpgradeableLoaderAccountProgramAtom';

// FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH
// Security.txt: HPxKXnBN4vJ8RjpdqDCU7gvNQHeeyGnSviYTJ4fBrDt4 cluster=devnet
function BPFUpgradeableLoaderAccountProgram() {
  const parsedBPFUpgradeableLoaderAccountProgram = useRecoilValue(
    parsedBPFUpgradeableLoaderAccountProgramAtom
  );

  if (!parsedBPFUpgradeableLoaderAccountProgram) {
    return null;
  }

  const { parsed, parsedProgramAccount } =
    parsedBPFUpgradeableLoaderAccountProgram;

  const { programData } = parsed;

  return (
    <ExplorerAccordion
      id="bpf-upgradeable-loader-program-info"
      title="BPF Upgradeable Loader Program Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Executable Data"
            value={<LabeledAddressLink to={programData} allowCopy={true} />}
          />
          <ExplorerGridRow
            label="Upgradeable"
            value={parsedProgramAccount.authority !== null ? 'Yes' : 'No'}
          />
          <ExplorerGridRow
            label={<LastVerifiedBuildLabel />}
            value={<VerifiedBadge />}
          />
          <ExplorerGridRow
            label={<SecurityLabel />}
            value={<SecurityTXTBadge />}
          />
          <ExplorerGridRow
            label="Last Deployed Slot"
            value={
              <ExplorerLink
                type="block"
                to={parsedProgramAccount.slot}
                allowCopy={true}
              />
            }
          />
          {parsedProgramAccount.authority !== null && (
            <ExplorerGridRow
              label="Upgrade Authority"
              value={
                <LabeledAddressLink
                  to={parsedProgramAccount.authority}
                  allowCopy={true}
                />
              }
            />
          )}
        </ExplorerGrid>
      }
    />
  );
}

export default BPFUpgradeableLoaderAccountProgram;
