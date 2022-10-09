import { Chip } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExternalLink from '../_sharedComponents/ExternalLink';
import parsedBPFUpgradeableLoaderAccountProgramAtom from './_atoms/parsedBPFUpgradeableLoaderAccountProgramAtom';

function VerifiedBadge() {
  const parsedBPFUpgradeableLoaderAccountProgram = useRecoilValue(
    parsedBPFUpgradeableLoaderAccountProgramAtom
  );

  if (!parsedBPFUpgradeableLoaderAccountProgram) {
    return null;
  }

  const { parsedProgramAccount, verifiableBuild } =
    parsedBPFUpgradeableLoaderAccountProgram;

  if (
    verifiableBuild &&
    verifiableBuild.verifiedSlot === parsedProgramAccount.slot
  ) {
    return (
      <>
        <Chip
          color="success"
          label={`${verifiableBuild.label}: Verified`}
          size="small"
        />
        <ExternalLink url={verifiableBuild.url} label="Info" />
      </>
    );
  }
  return (
    <Chip
      color="error"
      label={`${verifiableBuild.label}: Unverified`}
      size="small"
    />
  );
}

export default VerifiedBadge;
