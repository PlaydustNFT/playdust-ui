import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import notificationAtom from './_atoms/notificationAtom';

function Notifications() {
  const { open, message, severity } = useRecoilValue(notificationAtom);
  const reset = useResetRecoilState(notificationAtom);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={reset}
    >
      <Alert onClose={reset} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Notifications;
