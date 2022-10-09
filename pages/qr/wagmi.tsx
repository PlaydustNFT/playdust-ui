import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import JoinTheWhitelist from '../../src/App/Window/JoinTheWhitelist/JoinTheWhitelist';

const RootContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
`;

function Wagmi() {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  return (
    <RootContainer>
      <Grid
        container={true}
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid item={true} xs={12}>
          <JoinTheWhitelist />
        </Grid>
      </Grid>
    </RootContainer>
  );
}

export default Wagmi;
