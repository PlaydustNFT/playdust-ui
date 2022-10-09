import OpenSearchNFTSourceType from '../src/App/Window/WindowSwitch/_types/OpenSearchNFTSourceType';

export type SearchMetadataOnChain = Pick<SearchMetadata, 'data' | 'mint'>;

type SearchMetadata = OpenSearchNFTSourceType;

export default SearchMetadata;
