import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid, Tooltip } from '@mui/material';
import React from 'react';

function SecurityLabel() {
  return (
    <Grid container={true} alignItems="center">
      Security.txt&nbsp;
      <Tooltip
        disableFocusListener={true}
        disableTouchListener={true}
        title="Security.txt helps security researchers to contact developers if they find security bugs."
      >
        <HelpOutlineIcon fontSize="small" />
      </Tooltip>
    </Grid>
  );
}

export default SecurityLabel;
