import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import useSetOnlyListed from './_hooks/useSetOnlyListed';

function OnlyListedSwitch() {
  const { onlyListed } = useRecoilValue(searchStateAtom);
  const setOnlyListed = useSetOnlyListed();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={Boolean(onlyListed)}
          onChange={() => setOnlyListed(!onlyListed)}
        />
      }
      label="Only Listed Items"
    />
  );
}

export default OnlyListedSwitch;
