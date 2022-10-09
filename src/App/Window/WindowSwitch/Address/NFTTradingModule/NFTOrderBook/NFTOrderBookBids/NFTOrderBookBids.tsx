import { Cancel, CheckCircle, ErrorOutline } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import connectedWalletAtom from '../../../../../../_atoms/connectedWalletAtom';
import safePubkeyString from '../../../../../../_helpers/safePubkeyString';
import addressStateAtom from '../../../../_atoms/addressStateAtom';
import playdustNftDataAtom from '../../../../_atoms/playdustNftDataAtom';
import humanizeSolana from '../../../../_helpers/humanizeSolana';
import lamportsToSol from '../../../../_helpers/lamportsToSol';
import ExplorerLink from '../../../../_sharedComponents/ExplorerLink/ExplorerLink';
import currentOwnerForMintAtom from '../../../_atoms/currentOwnerForMintAtom';
import ordersForMintAtom from '../../_atoms/ordersForMintAtom';
import tradingDialogAtom from '../../_atoms/tradingDialogAtom';
import walletEscrowAtom from '../../_atoms/walletEscrowAtom';
import MarketplaceIcon from '../_sharedComponents/MarketplaceIcon';
import Tooltip from './Tooltip';

function NFTOrderBookBids() {
  const setTradingDialog = useSetRecoilState(tradingDialogAtom);
  const ownerWalletAddress = useRecoilValue(currentOwnerForMintAtom);
  const orders = useRecoilValue(ordersForMintAtom);
  const walletModal = useWalletModal();
  const addressState = useRecoilValue(addressStateAtom);
  const connectedWallet = useRecoilValue(connectedWalletAtom);
  const playdustData = useRecoilValue(playdustNftDataAtom);
  const walletEscrow = useRecoilValue(walletEscrowAtom);
  const isOwner =
    connectedWallet !== null && ownerWalletAddress === connectedWallet;

  if (!addressState) {
    return null;
  }

  const mintAddress = safePubkeyString(addressState.pubkey);
  const myBid =
    orders?.bids.find((order) => order.wallet === connectedWallet) ?? null;
  const escrowAmount = lamportsToSol(walletEscrow?.amount || 0);

  const marketBids = (playdustData?.mintBids ?? []).filter(
    (bid) => bid.marketplace === 'MagicEdenV2'
  );

  const hasBids = !!(orders?.bids.length || marketBids.length);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Bid</b>
            </TableCell>
            <TableCell>From</TableCell>
            <TableCell>Tx</TableCell>
            <TableCell>
              <b>
                {orders?.bids && orders.bids.length > 0 && isOwner
                  ? 'Sell'
                  : ''}
              </b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!hasBids && (
            <TableRow sx={{ textAlign: 'left', padding: '16px' }}>
              <TableCell>
                <b>No active bids found!</b>
              </TableCell>
            </TableRow>
          )}
          {(orders?.bids ?? []).map((order) => (
            <TableRow key={order.txHash}>
              <TableCell>
                {myBid?.txHash === order.txHash &&
                escrowAmount < order.price ? (
                  <Tooltip
                    title={`Bid is invalid. Escrow account has insufficient funds. (${humanizeSolana(
                      escrowAmount
                    )})`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ErrorOutline color="warning" />
                      <Box sx={{ ml: 1, color: 'grey.500' }}>
                        {humanizeSolana(order.price)}
                      </Box>
                    </Box>
                  </Tooltip>
                ) : (
                  humanizeSolana(order.price)
                )}
              </TableCell>
              <TableCell>
                <ExplorerLink
                  type="address"
                  to={order.wallet}
                  allowCopy={true}
                  ellipsis={{
                    cutoff: 4,
                    remain: 4,
                  }}
                />
              </TableCell>
              <TableCell>
                <ExplorerLink
                  type="tx"
                  to={order.txHash}
                  allowCopy={true}
                  ellipsis={{
                    cutoff: 4,
                    remain: 4,
                  }}
                />
              </TableCell>
              <TableCell>
                {myBid?.txHash === order.txHash && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      if (!connectedWallet) {
                        walletModal.setVisible(true);
                        return;
                      }
                      setTradingDialog({
                        type: 'cancelBid',
                        wallet: connectedWallet,
                        bid: order,
                        mintAddress,
                      });
                    }}
                  >
                    <Cancel />
                  </IconButton>
                )}
                {isOwner && myBid?.wallet !== connectedWallet && (
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => {
                      if (!connectedWallet) {
                        walletModal.setVisible(true);
                        return;
                      }
                      setTradingDialog({
                        type: 'acceptBid',
                        wallet: connectedWallet,
                        bid: order,
                        mintAddress,
                      });
                    }}
                  >
                    <CheckCircle />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
          {marketBids.map((order) => (
            <TableRow key={order.signature}>
              <TableCell>{humanizeSolana(order.price)}</TableCell>
              <TableCell>
                <ExplorerLink
                  type="address"
                  to={order.wallet}
                  allowCopy={true}
                  ellipsis={{
                    cutoff: 4,
                    remain: 4,
                  }}
                />
              </TableCell>
              <TableCell>
                <ExplorerLink
                  type="tx"
                  to={order.signature}
                  allowCopy={true}
                  ellipsis={{
                    cutoff: 4,
                    remain: 4,
                  }}
                />
              </TableCell>
              <TableCell>
                <MarketplaceIcon
                  marketplace={order.marketplace}
                  address={addressState.pubkey.toString()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NFTOrderBookBids;
