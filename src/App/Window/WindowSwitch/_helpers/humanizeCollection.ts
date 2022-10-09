import type OpenSearchCollectionSourceType from '../_types/OpenSearchCollectionSourceType';

const humanizeCollection = ({
  name,
}: Partial<OpenSearchCollectionSourceType>): string => name || '';

export default humanizeCollection;
