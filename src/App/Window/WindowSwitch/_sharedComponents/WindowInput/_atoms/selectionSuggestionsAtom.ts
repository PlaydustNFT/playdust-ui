import { selector } from 'recoil';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import searchQueryActiveNodeAtom from './searchQueryActiveNodeAtom';
import searchQuerySelectedNodesAtom from './searchQuerySelectedNodesAtom';

const selectionSuggestionsAtom = selector<SearchSuggestionType[] | null>({
  key: 'selectionSuggestionsAtom',
  get: ({ get }) => {
    const selectedNodes = get(searchQuerySelectedNodesAtom);
    const activeNode = get(searchQueryActiveNodeAtom);
    const clearSearchQuery = get(clearSearchQueryAtom);

    if (
      !selectedNodes.length ||
      activeNode?.type !== 'group' ||
      clearSearchQuery
    ) {
      return null;
    }

    const inverseOperator = activeNode.operator === 'and' ? 'or' : 'and';

    return [
      {
        key: 'selection-remove',
        label: 'Remove Selection',
        group: 'Selection',
        action: 'remove',
      },
      {
        key: 'selection-group',
        label: `Group Selection in ${inverseOperator.toUpperCase()}`,
        group: 'Selection',
        action: 'group',
      },
    ];
  },
});

export default selectionSuggestionsAtom;
