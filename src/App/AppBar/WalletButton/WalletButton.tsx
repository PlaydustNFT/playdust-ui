import { Person } from '@mui/icons-material';
import { Fab, Menu, MenuItem } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import connectedWalletAtom from '../../_atoms/connectedWalletAtom';
import ellipsisify from '../../_helpers/ellipsisify';
import safePromise from '../../_helpers/safePromise';
import safePubkeyString from '../../_helpers/safePubkeyString';
import useAuth from '../../_hooks/useAuth';
import useGoToProfile from './_hooks/useGoToProfile';

interface WalletButtonProps {
  backgroundColor: string;
  size: number;
}

function WalletButton({ backgroundColor, size }: WalletButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const open = !!anchorEl;
  const auth = useAuth();
  const [connectedWallet, setConnectedWallet] =
    useRecoilState(connectedWalletAtom);
  const resetConnectedWallet = useResetRecoilState(connectedWalletAtom);
  const goToProfile = useGoToProfile();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      const publicKeyString = wallet.publicKey.toString();

      setConnectedWallet(publicKeyString);
    } else {
      resetConnectedWallet();
    }
  }, [
    setConnectedWallet,
    resetConnectedWallet,
    wallet.connected,
    wallet.publicKey,
  ]);

  const buttonProps = connectedWallet
    ? {
        children: ellipsisify(connectedWallet, 4, 4),
        onClick: (event: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget),
      }
    : {
        children: 'Connect Wallet',
        onClick: () => walletModal.setVisible(true),
      };

  return (
    <>
      <Fab {...buttonProps} sx={{ width: size, height: size, backgroundColor }}>
        <Person />
      </Fab>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{ ml: 2 }}
      >
        <MenuItem onClick={() => goToProfile()}>
          Wallet:{' '}
          {wallet.publicKey &&
            ellipsisify(safePubkeyString(wallet.publicKey), 4, 4)}
        </MenuItem>
        <MenuItem onClick={() => safePromise(auth.logout())}>
          Disconnect
        </MenuItem>
      </Menu>
    </>
  );
}

export default WalletButton;
