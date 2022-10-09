import { selector } from 'recoil';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import searchQueryRootNodeAtom from '../../../_atoms/searchQueryRootNodeAtom';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import searchQueryTermAtom from './searchQueryTermAtom';
import searchQueryTermWindowTypeAtom from './searchQueryTermWindowTypeAtom';

const explorerSuggestionsAtom = selector<SearchSuggestionType[] | null>({
  key: 'explorerSuggestionsAtom',
  get: ({ get }) => {
    const rootNode = get(searchQueryRootNodeAtom);
    const clearSearchQuery = get(clearSearchQueryAtom);

    if (rootNode && !clearSearchQuery) {
      return null;
    }

    const term = get(searchQueryTermAtom);
    const windowType = get(searchQueryTermWindowTypeAtom);
    const highlightedTerm = `<b>${term}</b>`;

    if (windowType === 'block' || windowType === 'epoch') {
      return [
        {
          key: 'block-search',
          group: 'Explorer',
          label: `block ${highlightedTerm}`,
          type: 'block',
          meta: term,
        },
        {
          key: 'epoch-search',
          group: 'Explorer',
          label: `epoch ${highlightedTerm}`,
          type: 'epoch',
          meta: term,
        },
      ];
    }

    if (windowType === 'address') {
      return [
        {
          key: 'address-search',
          group: 'Explorer',
          label: `address ${highlightedTerm}`,
          type: 'address',
          meta: term,
        },
      ];
    }

    if (windowType === 'tx') {
      return [
        {
          key: 'transaction-search',
          group: 'Explorer',
          label: `transaction ${highlightedTerm}`,
          type: 'tx',
          meta: term,
        },
      ];
    }

    return null;
  },
});

export default explorerSuggestionsAtom;
