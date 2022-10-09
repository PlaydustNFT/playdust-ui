import styled from '@emotion/styled';
import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import playdustNftDataAtom from '../../_atoms/playdustNftDataAtom';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';

const Item = styled(Paper)`
  background-color: #f6f6f6;
  padding: 8px 8px 8px 16px;
`;

function MetaplexNFTAttributes() {
  const playdustNftData = useRecoilValue(playdustNftDataAtom);

  if (!playdustNftData || !playdustNftData.mintOffChainMetadata) {
    return null;
  }

  const { attributes } = playdustNftData.mintOffChainMetadata;

  if (!attributes) {
    return null;
  }

  return (
    <ExplorerAccordion
      title="Attributes"
      expanded={true}
      content={
        <Box>
          <Grid container={true} spacing={2}>
            {attributes.map((attribute) => (
              <Grid key={attribute.trait_type} item={true} xs={6} md={4}>
                <Item>
                  <Typography
                    sx={{
                      color: '#45575c',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {attribute.trait_type}
                  </Typography>
                  <Typography sx={{ color: '#141414', fontWeight: '600' }}>
                    {attribute.value}
                  </Typography>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    />
  );
}

export default MetaplexNFTAttributes;
