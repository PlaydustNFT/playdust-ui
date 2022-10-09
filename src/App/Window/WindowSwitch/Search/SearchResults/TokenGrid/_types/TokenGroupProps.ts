import type OpenSearchNFTSourceType from '../../../../_types/OpenSearchNFTSourceType';
import type TokenGridBaseProps from './TokenGridBaseProps';

interface TokenGroupProps extends TokenGridBaseProps {
  totalRows: number;
  grouped: {
    key: string;
    groupLabel: string;
    groupSecondary?: string;
    groupTotal: number;
    groupHref: string;
    nfts: OpenSearchNFTSourceType[];
  }[];
}

export default TokenGroupProps;
