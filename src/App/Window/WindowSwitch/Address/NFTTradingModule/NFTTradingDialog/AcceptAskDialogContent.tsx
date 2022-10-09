import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import humanizeSolana from '../../../_helpers/humanizeSolana';
import TradingDialogType from '../_types/TradingDialogType';
import makeNFTBid from './_helpers/makeNFTBid';
import useConfirmTransaction from './_hooks/useConfirmTransaction';
import TradingDialogContentProps from './_types/TradingDialogContentProps';

function AcceptAskDialogContent({
  action,
  close,
  execute,
}: TradingDialogContentProps<TradingDialogType & { type: 'acceptAsk' }>) {
  const { wallet, mintAddress, ask } = action;
  const confirmTransaction = useConfirmTransaction();

  const handleClick = () => {
    execute(() =>
      confirmTransaction(
        makeNFTBid(wallet, mintAddress, ask.price),
        'NFT bought successfully!',
        'Failed to buy NFT!'
      )
    );
  };

  return (
    <>
      <DialogTitle>Buy NFT</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Do you want to buy this NFT for ${humanizeSolana(ask.price)}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={handleClick}
        >
          Sign: Buy NFT
        </Button>
      </DialogActions>
    </>
  );
}

export default AcceptAskDialogContent;
