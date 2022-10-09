import { AlertProps } from '@mui/material';
import { atom } from 'recoil';

type NotificationType = {
  open: boolean;
  message?: string;
  severity?: AlertProps['severity'];
};

const notificationAtom = atom<NotificationType>({
  key: 'notificationAtom',
  default: {
    open: false,
  },
});

export default notificationAtom;
