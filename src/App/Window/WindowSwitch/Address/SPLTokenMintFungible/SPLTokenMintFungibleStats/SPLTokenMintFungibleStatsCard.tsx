import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface SPLTokenMintFungibleStatsCardProps {
  header: ReactNode;
  details: ReactNode;
}

function SPLTokenMintFungibleStatsCard({
  header,
  details,
}: SPLTokenMintFungibleStatsCardProps) {
  const sx = {
    bgcolor: 'background.paper',
    border: '1px solid grey',
    padding: '12px',
  };

  return (
    <Box sx={sx}>
      {header}
      {details}
    </Box>
  );
}

export default SPLTokenMintFungibleStatsCard;
