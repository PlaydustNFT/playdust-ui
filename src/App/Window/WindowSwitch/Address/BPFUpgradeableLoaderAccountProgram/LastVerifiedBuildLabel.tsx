import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid, Tooltip } from '@mui/material';
import React from 'react';

function LastVerifiedBuildLabel() {
  return (
    <Grid container={true} alignItems="center">
      Verifiable Build Status&nbsp;
      <Tooltip
        disableFocusListener={true}
        disableTouchListener={true}
        title="Indicates whether the program currently deployed on-chain is verified to match the associated published source code, when it is available."
      >
        <HelpOutlineIcon fontSize="small" />
      </Tooltip>
    </Grid>
  );
}

export default LastVerifiedBuildLabel;
