import { ReactNode } from 'react';

interface TokenGridBaseProps {
  initialized: boolean;
  imageSize: number;
  cardGap: number;
  contentHeight: number;
  rowGap: number;
  next?: () => Promise<void>;
  content?: ReactNode;
}

export default TokenGridBaseProps;
