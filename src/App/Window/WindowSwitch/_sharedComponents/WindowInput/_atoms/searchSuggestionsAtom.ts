import { noWait, selector } from 'recoil';
import windowStateAtom from '../../../../_atoms/windowStateAtom';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import clientSuggestionsAtom from './clientSuggestionsAtom';
import explorerSuggestionsAtom from './explorerSuggestionsAtom';
import searchQueryTermAtom from './searchQueryTermAtom';
import selectionSuggestionsAtom from './selectionSuggestionsAtom';
import serverSuggestionsAtom from './serverSuggestionsAtom';

type SearchSuggestionAtomType = {
  suggestions: SearchSuggestionType[];
  loading: boolean;
};

const searchSuggestionsAtom = selector<SearchSuggestionAtomType>({
  key: 'searchSuggestionsAtom',
  get: ({ get }) => {
    const term = get(searchQueryTermAtom);
    const suggestions: SearchSuggestionType[] = [];

    const fuzzySuggestion: SearchSuggestionType = {
      key: 'fuzzy-search',
      group: 'Search',
      label: `search for <b>${term}</b>`,
    };
    const noResults: SearchSuggestionType = {
      key: 'no-results',
      group: 'No Results',
      label: '<i>No reults found...</i>',
    };
    const clientSuggestionsLoadable = get(noWait(clientSuggestionsAtom));
    const serverSuggestionsLoadable = get(noWait(serverSuggestionsAtom));
    const explorerSuggestions = get(explorerSuggestionsAtom);
    const selectionSuggestions = get(selectionSuggestionsAtom);
    const windowState = get(windowStateAtom);

    if (windowState.state === term) {
      return {
        loading: false,
        suggestions: [],
      };
    }

    if (selectionSuggestions) {
      return {
        loading: false,
        suggestions: selectionSuggestions,
      };
    }

    if (term.length > 0) {
      suggestions.push(fuzzySuggestion);
    }

    if (explorerSuggestions) {
      return {
        loading: false,
        suggestions: explorerSuggestions,
      };
    }

    if (clientSuggestionsLoadable.state === 'hasValue') {
      const { contents } = clientSuggestionsLoadable;

      if (contents) {
        suggestions.push(...(contents.length === 0 ? [noResults] : contents));
      }
    }

    if (serverSuggestionsLoadable.state === 'hasValue') {
      const { contents } = serverSuggestionsLoadable;

      if (contents) {
        suggestions.push(...(contents.length === 0 ? [noResults] : contents));
      }
    }

    const loading =
      clientSuggestionsLoadable.state === 'loading' ||
      serverSuggestionsLoadable.state === 'loading';

    return {
      loading,
      suggestions,
    };
  },
});

export default searchSuggestionsAtom;
