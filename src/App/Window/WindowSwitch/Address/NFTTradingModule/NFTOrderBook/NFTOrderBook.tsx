import { Grid } from '@mui/material';
import React from 'react';
import NFTOrderBookAsks from './NFTOrderBookAsks';
import NFTOrderBookBids from './NFTOrderBookBids/NFTOrderBookBids';

function NFTOrderBook() {
  return (
    <Grid container={true} spacing={1}>
      <Grid item={true} xs={12} lg={6}>
        <NFTOrderBookAsks />
      </Grid>
      <Grid item={true} xs={12} lg={6}>
        <NFTOrderBookBids />
      </Grid>
    </Grid>
  );
}

export default NFTOrderBook;
