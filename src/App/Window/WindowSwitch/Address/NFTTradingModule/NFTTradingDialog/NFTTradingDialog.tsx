import { Cancel, CheckCircle } from '@mui/icons-material';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useCallback, useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import currentOwnerForMintAtom from '../../_atoms/currentOwnerForMintAtom';
import ordersForMintAtom from '../_atoms/ordersForMintAtom';
import tradingDialogAtom from '../_atoms/tradingDialogAtom';
import walletEscrowAtom from '../_atoms/walletEscrowAtom';
import AcceptAskDialogContent from './AcceptAskDialogContent';
import AcceptBidDialogContent from './AcceptBidDialogContent';
import CancelAskDialogContent from './CancelAskDialogContent/CancelAskDialogContent';
import CancelBidDialogContent from './CancelBidDialogContent/CancelBidDialogContent';
import NewAskDialogContent from './NewAskDialogContent';
import NewBidDialogContent from './NewBidDialogContent';

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: React.ReactElement<unknown, any>;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="down" ref={ref} {...props} />
);

function NFTTradingDialog() {
  const [tradingDialog, setTradingDialog] = useRecoilState(tradingDialogAtom);

  const resetOrders = useRecoilRefresher_UNSTABLE(ordersForMintAtom);
  const resetOwner = useRecoilRefresher_UNSTABLE(currentOwnerForMintAtom);
  const resetEscrow = useRecoilRefresher_UNSTABLE(walletEscrowAtom);
  const reset = useCallback(() => {
    resetOrders();
    resetOwner();
    resetEscrow();
  }, [resetOrders, resetOwner, resetEscrow]);

  const [executing, setExecuting] = useState(false);
  const [resolution, setResolution] = useState<
    ['success' | 'error', string] | null
  >(null);

  const close = () => {
    if (executing && !resolution) {
      return;
    }
    setExecuting(false);
    setResolution(null);
    setTradingDialog(null);
    if (resolution && resolution[0] === 'success') {
      reset();
    }
  };
  const executeAction = (test: () => Promise<string>) => {
    setExecuting(true);
    test()
      .then((msg) => setResolution(['success', msg]))
      .catch((e: Error) => setResolution(['error', e.message]));
  };

  const renderContent = () => {
    switch (tradingDialog?.type) {
      case 'cancelBid':
        return (
          <CancelBidDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      case 'cancelAsk':
        return (
          <CancelAskDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      case 'newBid':
        return (
          <NewBidDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      case 'newAsk':
        return (
          <NewAskDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      case 'acceptAsk':
        return (
          <AcceptAskDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      case 'acceptBid':
        return (
          <AcceptBidDialogContent
            close={close}
            execute={executeAction}
            action={tradingDialog}
          />
        );
      default:
        return null;
    }
  };
  return (
    <Dialog
      open={tradingDialog !== null}
      TransitionComponent={Transition}
      keepMounted={false}
      onClose={close}
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      maxWidth="sm"
    >
      {(executing || resolution) && (
        <>
          <DialogTitle sx={{ display: 'flex' }}>
            {executing && !resolution && (
              <CircularProgress
                size={16}
                sx={{ marginRight: '8px', alignSelf: 'center' }}
              />
            )}
            {resolution && resolution[0] === 'success' && (
              <CheckCircle sx={{ marginRight: '8px', alignSelf: 'center' }} />
            )}
            {resolution && resolution[0] === 'error' && (
              <Cancel sx={{ marginRight: '8px', alignSelf: 'center' }} />
            )}
            {' Transaction'}
          </DialogTitle>
          <DialogContent sx={{ justifyContent: 'center' }}>
            <DialogContentText>
              {!resolution ? 'Follow Wallet Instructions' : resolution[1]}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {executing && !resolution ? (
              <Button
                variant="outlined"
                size="large"
                onClick={close}
                disabled={true}
              >
                <CircularProgress size={16} sx={{ marginRight: '8px' }} />{' '}
                Executing...
              </Button>
            ) : (
              <Button variant="outlined" size="large" onClick={close}>
                Ok
              </Button>
            )}
          </DialogActions>
        </>
      )}
      <Alert severity="error">
        Product demo mode. Trading enabled. Trade at your own risk.
      </Alert>
      {!executing && !resolution && renderContent()}
    </Dialog>
  );
}

export default NFTTradingDialog;
