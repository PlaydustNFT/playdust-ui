import { Button } from '@mui/material';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import connectedWalletAtom from '../../../../_atoms/connectedWalletAtom';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import addressStateAtom from '../../_atoms/addressStateAtom';
import currentOwnerForMintAtom from '../_atoms/currentOwnerForMintAtom';
import ordersForMintAtom from './_atoms/ordersForMintAtom';
import tradingDialogAtom from './_atoms/tradingDialogAtom';

function TradeButtons() {
  const setTradingDialog = useSetRecoilState(tradingDialogAtom);
  const addressState = useRecoilValue(addressStateAtom);
  const ownerWalletAddress = useRecoilValue(currentOwnerForMintAtom);
  const orders = useRecoilValue(ordersForMintAtom);
  const connectedWallet = useRecoilValue(connectedWalletAtom);
  const walletModal = useWalletModal();

  if (!addressState) {
    return null;
  }

  const mintAddress = safePubkeyString(addressState.pubkey);
  const isOwner =
    connectedWallet !== null && ownerWalletAddress === connectedWallet;
  const myListing =
    orders?.asks.find((order) => order.wallet === connectedWallet) ?? null;
  const myBid =
    orders?.bids.find((order) => order.wallet === connectedWallet) ?? null;
  const highestBid =
    orders?.bids.find((order) => order.wallet !== connectedWallet) ?? null;
  const lowestAsk =
    orders?.asks.find((order) => order.wallet === ownerWalletAddress) ?? null;

  return (
    <>
      {/* Cancel: Bid / Listing first */}
      {myBid && connectedWallet && (
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => {
            setTradingDialog({
              type: 'cancelBid',
              wallet: connectedWallet,
              bid: myBid,
              mintAddress,
            });
          }}
        >
          {`Cancel Bid: ◎${myBid.price}`}
        </Button>
      )}
      {myListing && connectedWallet && (
        <Button
          variant="contained"
          size="large"
          color="error"
          onClick={() => {
            setTradingDialog({
              type: 'cancelAsk',
              wallet: connectedWallet,
              ask: myListing,
              mintAddress,
            });
          }}
        >
          {`Cancel Listing: ◎${myListing.price}`}
        </Button>
      )}
      {/* Create: New offer / listing second  */}
      {isOwner && !myListing && (
        <Button
          variant={highestBid ? 'outlined' : 'contained'}
          size="large"
          color={highestBid ? 'inherit' : 'success'}
          onClick={() => {
            if (!connectedWallet) {
              walletModal.setVisible(true);
              return;
            }
            setTradingDialog({
              type: 'newAsk',
              wallet: connectedWallet,
              mintAddress,
            });
          }}
        >
          List NFT for Sale
        </Button>
      )}

      {!isOwner && !myBid && (
        <Button
          variant={lowestAsk ? 'outlined' : 'contained'}
          size="large"
          color={lowestAsk ? 'inherit' : 'success'}
          onClick={() => {
            if (!connectedWallet) {
              walletModal.setVisible(true);
              return;
            }
            setTradingDialog({
              type: 'newBid',
              wallet: connectedWallet,
              mintAddress,
            });
          }}
        >
          Make Offer
        </Button>
      )}
      {/* Trade: Accept offer / listing third  */}
      {isOwner && highestBid && (
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => {
            if (!connectedWallet) {
              walletModal.setVisible(true);
              return;
            }
            setTradingDialog({
              type: 'acceptBid',
              wallet: connectedWallet,
              bid: highestBid,
              mintAddress,
            });
          }}
        >
          {`Accept Highest Offer: ◎${highestBid.price}`}
        </Button>
      )}
      {!isOwner && lowestAsk && (
        <Button
          variant="contained"
          size="large"
          color="success"
          onClick={() => {
            if (!connectedWallet) {
              walletModal.setVisible(true);
              return;
            }
            setTradingDialog({
              type: 'acceptAsk',
              wallet: connectedWallet,
              ask: lowestAsk,
              mintAddress,
            });
          }}
        >
          {`Buy for: ◎${lowestAsk.price}`}
        </Button>
      )}
    </>
  );
}

export default TradeButtons;
