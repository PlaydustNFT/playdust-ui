import styled from '@emotion/styled';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import TradingDialogType from '../_types/TradingDialogType';
import makeNFTBid from './_helpers/makeNFTBid';
import useConfirmTransaction from './_hooks/useConfirmTransaction';
import TradingDialogContentProps from './_types/TradingDialogContentProps';

const TextFieldContainer = styled(TextField)`
  display: flex;
  flex: 1;
`;

const solanaInputProps = {
  type: 'number',
  InputProps: {
    endAdornment: <InputAdornment position="end">◎</InputAdornment>,
  },
  inputProps: {
    step: '0.01',
    min: '0',
  },
};

function NewBidDialogContent({
  action,
  close,
  execute,
}: TradingDialogContentProps<TradingDialogType & { type: 'newBid' }>) {
  const { wallet, mintAddress } = action;
  const confirmTransaction = useConfirmTransaction();
  const [userPrice, setUserPrice] = useState<number | ''>('');

  const handleClick = () => {
    if (Number(userPrice) <= 0) {
      return;
    }

    execute(() =>
      confirmTransaction(
        makeNFTBid(wallet, mintAddress, Number(userPrice)),
        'Bid placed successfully!',
        'Failed to place bid!'
      )
    );
  };

  return (
    <>
      <DialogTitle>New Bid</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          How much would you like to bid?
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <TextFieldContainer
          label="Price"
          value={userPrice}
          onChange={(e) => setUserPrice(Number(e.target.value))}
          {...solanaInputProps}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          color="success"
          disabled={Number(userPrice) <= 0}
          onClick={handleClick}
        >
          Sign: Place Bid
        </Button>
      </DialogActions>
    </>
  );
}

export default NewBidDialogContent;
