import { selector } from 'recoil';
import frontendApi from '../../../../_helpers/frontendApi';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import humanizeCollection from '../../../_helpers/humanizeCollection';
import type SearchSuggestionResponseType from '../_types/SearchSuggestionResponseType';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import hasCollectionDependencyAtom from './hasCollectionDependencyAtom';
import searchQueryDebouncedTermAtom from './searchQueryDebouncedTermAtom';
import searchQueryTermAtom from './searchQueryTermAtom';
import searchQueryTermWindowTypeAtom from './searchQueryTermWindowTypeAtom';

const getHighlight = ({
  highlights,
}: SearchSuggestionResponseType['collections'][0]) => {
  const highlightArray =
    highlights?.description || highlights?.name || highlights?.symbol;

  if (highlightArray) {
    return highlightArray[0];
  }

  return '';
};

const formatServerSuggestions = ({
  collections,
}: SearchSuggestionResponseType) => {
  const suggestions: SearchSuggestionType[] = [];

  collections.map((collection) =>
    suggestions.push({
      key: collection.source.id,
      group: 'Collections',
      label: `${humanizeCollection(collection.source)}: ${getHighlight(
        collection
      )}`,
      collectionId: collection.source.id,
    })
  );

  return suggestions;
};

const serverSuggestionsAtom = selector<SearchSuggestionType[] | null>({
  key: 'serverSuggestionsAtom',
  get: async ({ get }) => {
    const term = get(searchQueryTermAtom);
    const debouncedTerm = get(searchQueryDebouncedTermAtom);
    const hasCollectionDependency = get(hasCollectionDependencyAtom);
    const windowType = get(searchQueryTermWindowTypeAtom);
    const clearSearchQuery = get(clearSearchQueryAtom);

    if (
      term !== debouncedTerm ||
      debouncedTerm.length < 3 ||
      (hasCollectionDependency && !clearSearchQuery) ||
      windowType === 'address' ||
      windowType === 'tx'
    ) {
      return null;
    }

    try {
      const { data } = await frontendApi.post<SearchSuggestionResponseType>(
        '/search-suggestions',
        {
          term: debouncedTerm,
        }
      );

      return formatServerSuggestions(data);
    } catch {
      return null;
    }
  },
});

export default serverSuggestionsAtom;
