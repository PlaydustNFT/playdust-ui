import { PublicKey } from '@solana/web3.js';
import type { WindowUnionType } from '../../../../_types/WindowUnionType';

interface ExplorerLinkProps {
  to: PublicKey | string | number;
  label?: string;
  type: WindowUnionType;
  allowCopy?: boolean;
  ellipsis?: {
    cutoff: number;
    remain: number;
    ellipsis?: string;
  };
  component?: React.ElementType;
}
export default ExplorerLinkProps;
