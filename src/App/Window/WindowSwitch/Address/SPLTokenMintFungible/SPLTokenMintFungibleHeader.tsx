import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import addressStateAtom from '../../_atoms/addressStateAtom';
import tokenRegistryAtom from '../../_atoms/tokenRegistryAtom';

const IDENTICON_WIDTH = 64;

function SPLTokenMintFungibleHeader() {
  const addressState = useRecoilValue(addressStateAtom);
  const tokenRegistry = useRecoilValue(tokenRegistryAtom);

  if (!addressState) {
    return null;
  }

  const tokenInfo = tokenRegistry.get(safePubkeyString(addressState.pubkey));

  if (!tokenInfo) {
    return null;
  }

  const icon =
    tokenInfo && tokenInfo.logoURI ? (
      <img
        src={tokenInfo.logoURI}
        alt="token logo"
        style={{ width: IDENTICON_WIDTH }}
      />
    ) : null;

  return (
    <Box>
      <Grid container={true} spacing={1}>
        <Grid item={true}>{icon}</Grid>
        <Grid item={true}>
          <Typography variant="h5" component="h2" gutterBottom={true}>
            {tokenInfo.name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SPLTokenMintFungibleHeader;
