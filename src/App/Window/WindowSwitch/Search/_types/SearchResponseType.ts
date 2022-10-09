import type OpenSearchNFTSourceType from '../../_types/OpenSearchNFTSourceType';

interface SearchResponseType {
  nfts: OpenSearchNFTSourceType[];
  total: number;
  page: number;
}

export default SearchResponseType;
