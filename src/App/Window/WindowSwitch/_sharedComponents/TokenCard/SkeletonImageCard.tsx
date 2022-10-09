import { Box, Card, Skeleton } from '@mui/material';
import React from 'react';
import TokenCardContentContainer from './_sharedComponents/TokenCardContentContainer';
import type TokenCardProps from './_types/TokenCardProps';

function SkeletonImageCard({
  imageSize,
  contentHeight,
}: Partial<TokenCardProps>) {
  return (
    <div>
      <Card sx={{ width: imageSize }} square={true}>
        <Skeleton
          sx={{
            height: imageSize,
            width: imageSize,
          }}
          animation="wave"
          variant="rectangular"
        />
        <Box
          sx={{
            height: contentHeight,
            width: '100%',
          }}
        >
          <TokenCardContentContainer />
        </Box>
      </Card>
    </div>
  );
}

export default SkeletonImageCard;
