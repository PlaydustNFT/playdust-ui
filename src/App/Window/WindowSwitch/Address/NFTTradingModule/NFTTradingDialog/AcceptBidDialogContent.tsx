import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import humanizeSolana from '../../../_helpers/humanizeSolana';
import lamportsToSol from '../../../_helpers/lamportsToSol';
import tradeApi from '../_helpers/tradeApi';
import EscrowType from '../_types/EscrowType';
import TradingDialogType from '../_types/TradingDialogType';
import makeNFTListing from './_helpers/makeNFTListing';
import useConfirmTransaction from './_hooks/useConfirmTransaction';
import TradingDialogContentProps from './_types/TradingDialogContentProps';

function AcceptBidDialogContent({
  action,
  close,
  execute,
}: TradingDialogContentProps<TradingDialogType & { type: 'acceptBid' }>) {
  const { wallet, mintAddress, bid } = action;
  const confirmTransaction = useConfirmTransaction();

  const handleClick = () => {
    execute(() =>
      tradeApi
        .get<EscrowType>(`/escrow/${bid.wallet}`)
        .catch(() => {
          throw new Error('Failed to sell NFT!');
        })
        .then(({ data }) => {
          const escrowAmount = lamportsToSol(data.amount);

          if (escrowAmount < bid.price) {
            throw new Error(
              'Failed to sell NFT! Bidder has insufficient funds.'
            );
          }

          return confirmTransaction(
            makeNFTListing(wallet, mintAddress, bid.price),
            'NFT sold successfully!',
            'Failed to sell NFT!'
          );
        })
    );
  };

  return (
    <>
      <DialogTitle>Sell NFT</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`Do you want to sell your NFT for ${humanizeSolana(bid.price)}?`}
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
          Sign: Sell NFT
        </Button>
      </DialogActions>
    </>
  );
}

export default AcceptBidDialogContent;
