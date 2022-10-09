import OpenSearchCollectionSourceType from '../../../_types/OpenSearchCollectionSourceType';

interface SearchSuggestionResponseType {
  collections: {
    source: OpenSearchCollectionSourceType;
    highlights: Record<string, string[]> | undefined;
  }[];
}

export default SearchSuggestionResponseType;
