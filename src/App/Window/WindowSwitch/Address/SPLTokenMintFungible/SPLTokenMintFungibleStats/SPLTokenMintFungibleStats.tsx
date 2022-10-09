import { Box, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import SPLTokenMintFungibleStatsCard from './SPLTokenMintFungibleStatsCard';
import coinGeckoAtom from './_atoms/coinGeckoAtom';

function abbreviatedNumber(value: number | undefined, fixed = 1) {
  if (!value) {
    return '';
  }
  if (value < 1e3) return value;
  if (value >= 1e3 && value < 1e6) return `${+(value / 1e3).toFixed(fixed)}K`;
  if (value >= 1e6 && value < 1e9) return `${+(value / 1e6).toFixed(fixed)}M`;
  if (value >= 1e9 && value < 1e12) return `${+(value / 1e9).toFixed(fixed)}B`;
  if (value >= 1e12) return `${+(value / 1e12).toFixed(fixed)}T`;
}

function SPLTokenMintFungibleStats() {
  const coinGecko = useRecoilValue(coinGeckoAtom);

  if (!coinGecko) {
    return null;
  }

  const price = coinGecko?.market_data?.current_price?.usd;
  const volume24 = coinGecko?.market_data?.total_volume?.usd;
  const marketCap = coinGecko?.market_data?.market_cap?.usd;
  const marketCapRank = coinGecko?.market_data?.market_cap_rank;
  const priceChangePercentage24h =
    coinGecko?.market_data?.price_change_percentage_24h;
  const lastUpdated = coinGecko?.last_updated
    ? new Date(coinGecko?.last_updated)
    : undefined;

  const tokenPriceDecimals = price && price < 1 ? 6 : 2;

  return (
    <Box>
      <Grid container={true} spacing={1} alignItems="stretch">
        <Grid item={true} xs={12} sm={4}>
          <SPLTokenMintFungibleStatsCard
            header={
              <Grid container={true} spacing={1} alignItems="center">
                <Grid item={true}>
                  <Typography variant="h6">Price</Typography>
                </Grid>
                <Grid item={true}>
                  <Chip
                    size="small"
                    color="info"
                    label={`Rank #${marketCapRank ?? 'N/A'}`}
                  />
                </Grid>
              </Grid>
            }
            details={
              <Typography variant="h5">
                ${price ? price.toFixed(tokenPriceDecimals) : 'N/A'}{' '}
                {priceChangePercentage24h?.toFixed(2) ?? 'N/A'}%
              </Typography>
            }
          />
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <SPLTokenMintFungibleStatsCard
            header={<Typography variant="h6">24 Hour Volume</Typography>}
            details={
              <Typography variant="h5">
                {abbreviatedNumber(volume24)}
              </Typography>
            }
          />
        </Grid>
        <Grid item={true} xs={12} sm={4}>
          <SPLTokenMintFungibleStatsCard
            header={<Typography variant="h6">Market Cap</Typography>}
            details={
              <Typography variant="h5">
                {abbreviatedNumber(marketCap)}
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <Grid container={true} spacing={0} justifyContent="flex-end">
        <Grid item={true}>
          <Typography variant="body1" sx={{ fontSize: '12px' }}>
            Updated at {lastUpdated?.toString() ?? 'N/A'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SPLTokenMintFungibleStats;
