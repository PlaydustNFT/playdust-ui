import type OpenSearchCollectionSourceType from './OpenSearchCollectionSourceType';

interface CollectionOverviewResponseType
  extends OpenSearchCollectionSourceType {
  similar: OpenSearchCollectionSourceType[];
  listed: number;
  images: string[];
}

export default CollectionOverviewResponseType;
