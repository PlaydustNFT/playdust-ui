import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import playdustNftDataAtom from '../../../_atoms/playdustNftDataAtom';
import ContentContainer from '../../../_sharedComponents/ContentContainer';
import ExplorerLink from '../../../_sharedComponents/ExplorerLink/ExplorerLink';
import currentOwnerForMintAtom from '../../_atoms/currentOwnerForMintAtom';
import NFTDetailsRenderMedia from './NFTDetailsRenderMedia';

const imageSize = 300;

function NFTDetailsView() {
  const playdustNftData = useRecoilValue(playdustNftDataAtom);
  const ownerWalletAddress = useRecoilValue(currentOwnerForMintAtom);

  if (!playdustNftData || !playdustNftData.mintOffChainMetadata) {
    return null;
  }

  const offChainData = playdustNftData.mintOffChainMetadata;

  return (
    <ContentContainer
      sx={{
        borderTop: '1px solid #e2e2e2',
        boxShadow: (theme) => `0px 10px 10px -10px ${theme.palette.grey[500]}`,
        backgroundColor: '#F6F6F6',
      }}
    >
      <Grid
        container={true}
        spacing={2}
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        })}
      >
        <Grid
          item={true}
          xs={12}
          md={6}
          sx={(theme) => ({
            maxWidth: `${imageSize}px !important`,
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          })}
        >
          <NFTDetailsRenderMedia imageSize={imageSize} />
        </Grid>
        <Grid
          item={true}
          xs={12}
          md={6}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            },
          })}
        >
          <Typography
            sx={{
              fontWeight: '700',
              fontSize: '40px',
              lineHeight: 1.25,
            }}
          >
            {offChainData.name}
          </Typography>
          {ownerWalletAddress && (
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '14px',
              }}
            >
              <Box sx={{ opacity: 0.4 }} component="span">
                {'Owned by '}
              </Box>
              <ExplorerLink
                component="span"
                type="address"
                to={ownerWalletAddress}
                allowCopy={true}
                ellipsis={{
                  cutoff: 4,
                  remain: 4,
                }}
              />
            </Typography>
          )}
          <Typography
            sx={{ fontWeight: '400', fontSize: '14px', mt: 2, mb: 2 }}
          >
            {offChainData.description}
          </Typography>
          {playdustNftData.mintRarity && (
            <Box
              sx={{
                backgroundColor: 'grey.300',
                width: '250px',
                p: 1,
                pl: 2,
                textAlign: 'left',
              }}
            >
              <Typography sx={{ opacity: '0.5' }}>Rarity Score</Typography>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {playdustNftData.mintRarity.rarityScore && (
                  <Typography sx={{ fontWeight: 600, fontSize: 28 }}>
                    {playdustNftData.mintRarity.rarityScore}
                  </Typography>
                )}
                {playdustNftData.mintRarity.normalizedRarityScore && (
                  <Typography sx={{ opacity: '0.5', ml: 2 }}>
                    {`${playdustNftData.mintRarity.normalizedRarityScore.toPrecision(
                      3
                    )}%`}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </ContentContainer>
  );
}

export default NFTDetailsView;
