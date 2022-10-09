import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import setWindowImagesAtom from '../../_atoms/setWindowImagesAtom';
import PlaydustLogo from '../../_sharedComponents/PlaydustLogo';
import WindowInput from '../_sharedComponents/WindowInput/WindowInput';
import TopCollections from './TopCollections/TopCollections';

function Home() {
  const setWindowImages = useRecoilValue(setWindowImagesAtom);

  useEffect(() => {
    if (setWindowImages) setWindowImages([]);
  }, [setWindowImages]);

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: '60%',
        }}
      >
        <Box>
          <PlaydustLogo width="215px" />
        </Box>
        <Typography variant="body1" marginBottom="16px">
          A Solana Search Engine (beta)
        </Typography>
        <Box sx={{ mb: 2, zIndex: 2 }}>
          <SuspenseBoundary
            loading={null}
            error={null}
            content={<WindowInput />}
          />
        </Box>
        <Box
          alignSelf="center"
          justifySelf="center"
          sx={{ zIndex: 1, height: '100%', width: '100%' }}
        >
          <TopCollections />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
