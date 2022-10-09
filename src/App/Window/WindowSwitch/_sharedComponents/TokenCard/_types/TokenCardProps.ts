import type OpenSearchNFTSourceType from '../../../_types/OpenSearchNFTSourceType';

type TokenCardProps =
  | {
      imageSize: number;
      skeleton: true;
      contentHeight: number;
      metadata?: OpenSearchNFTSourceType;
      disableQuickFilter?: boolean;
    }
  | {
      imageSize: number;
      skeleton?: false;
      contentHeight: number;
      metadata: OpenSearchNFTSourceType;
      disableQuickFilter?: boolean;
    };

export default TokenCardProps;
