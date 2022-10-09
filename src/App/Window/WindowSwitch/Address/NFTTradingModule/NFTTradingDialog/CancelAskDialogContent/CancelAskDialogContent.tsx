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
import cancelNFTListing from './_helpers/cancelNFTListing';

function CancelAskDialogContent({
  action,
  close,
  execute,
}: TradingDialogContentProps<TradingDialogType & { type: 'cancelAsk' }>) {
  const { wallet, mintAddress, ask } = action;
  const confirmTransaction = useConfirmTransaction();

  const handleClick = () => {
    execute(() =>
      confirmTransaction(
        cancelNFTListing(wallet, mintAddress, ask.price),
        'Listing canceled successful',
        'Failed to cancel listing'
      )
    );
  };

  return (
    <>
      <DialogTitle>Cancel Listing</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Do you want to cancel this listing (${humanizeSolana(ask.price)})?`}
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
          Sign: Cancel Listing
        </Button>
      </DialogActions>
    </>
  );
}

export default CancelAskDialogContent;
