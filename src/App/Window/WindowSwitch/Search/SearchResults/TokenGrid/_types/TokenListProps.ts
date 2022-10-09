import OpenSearchNFTSourceType from '../../../../_types/OpenSearchNFTSourceType';
import type TokenGridBaseProps from './TokenGridBaseProps';

interface TokenListProps extends TokenGridBaseProps {
  tokens: OpenSearchNFTSourceType[];
  total: number;
}

export default TokenListProps;
