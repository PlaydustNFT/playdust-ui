import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import humanizeSolana from '../../../../_helpers/humanizeSolana';
import TradingDialogType from '../../_types/TradingDialogType';
import useConfirmTransaction from '../_hooks/useConfirmTransaction';
import TradingDialogContentProps from '../_types/TradingDialogContentProps';
import cancelNFTBid from './_helpers/cancelNFTBid';

function CancelBidDialogContent({
  action,
  close,
  execute,
}: TradingDialogContentProps<TradingDialogType & { type: 'cancelBid' }>) {
  const { wallet, mintAddress, bid } = action;
  const confirmTransaction = useConfirmTransaction();

  const handleClick = () => {
    execute(() =>
      confirmTransaction(
        cancelNFTBid(wallet, mintAddress, bid.price),
        'Bid canceled successful',
        'Failed to cancel bid'
      )
    );
  };

  return (
    <>
      <DialogTitle>Cancel Bid</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Do you want to cancel this bid (${humanizeSolana(bid.price)})?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={handleClick}
        >
          Sign: Cancel Bid
        </Button>
      </DialogActions>
    </>
  );
}

export default CancelBidDialogContent;
