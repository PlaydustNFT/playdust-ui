import OpenSearchCollectionSourceType from '../../../_types/OpenSearchCollectionSourceType';
import type OpenSearchNFTSourceType from '../../../_types/OpenSearchNFTSourceType';

type TopCollectionsResponseType = {
  results: {
    collection: OpenSearchCollectionSourceType;
    nfts: OpenSearchNFTSourceType[];
  }[];
  total: number;
  page: number;
};

export default TopCollectionsResponseType;
