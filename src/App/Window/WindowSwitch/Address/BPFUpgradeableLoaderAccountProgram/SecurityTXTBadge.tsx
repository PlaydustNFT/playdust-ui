import { Chip } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import parsedBPFUpgradeableLoaderAccountProgramAtom from './_atoms/parsedBPFUpgradeableLoaderAccountProgramAtom';

function SecurityTXTBadge() {
  const parsedBPFUpgradeableLoaderAccountProgram = useRecoilValue(
    parsedBPFUpgradeableLoaderAccountProgramAtom
  );

  if (!parsedBPFUpgradeableLoaderAccountProgram) {
    return null;
  }

  const { securityTXT, error } = parsedBPFUpgradeableLoaderAccountProgram;

  if (securityTXT) {
    return <Chip color="success" label="Included" size="small" />;
  }

  return <Chip color="error" label={error} size="small" />;
}

export default SecurityTXTBadge;
