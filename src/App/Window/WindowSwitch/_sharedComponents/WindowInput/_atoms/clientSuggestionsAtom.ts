import { matchSorter } from 'match-sorter';
import { selector } from 'recoil';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import type SearchAggResponseType from '../../../_types/SearchAggResponseType';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import hasCollectionDependencyAtom from './hasCollectionDependencyAtom';
import searchAggsByNodeAtom from './searchAggsByNodeAtom';
import searchQueryActiveNodeAtom from './searchQueryActiveNodeAtom';
import searchQueryTermAtom from './searchQueryTermAtom';

const getClientSuggestions = (
  term: string,
  aggregations: SearchAggResponseType
): SearchSuggestionType[] => {
  const result: SearchSuggestionType[] = aggregations.flatMap((attribute) =>
    attribute.values.map((entry) => ({
      key: `attribute:${attribute.key}:${entry.value}`,
      group: 'Attribute',
      label: `${attribute.key}: ${
        entry.value
      } (${entry.count.toLocaleString()})`,
      attributeMeta: {
        key: attribute.key,
        value: entry.value,
      },
    }))
  );

  const uppercasedTerm = term.toUpperCase();
  const matched = matchSorter(result, term, { keys: ['label'] });
  const withHighlight: SearchSuggestionType[] = matched.map((entry) => ({
    ...entry,
    label: entry.label
      .split(' ')
      .map((word) => {
        let matchCount = 0;
        const chars = word.split('');
        const highlighted = chars
          .map((char) => {
            if (uppercasedTerm.includes(char.toUpperCase())) {
              matchCount += 1;

              return `<b>${char}</b>`;
            }

            return char;
          })
          .join('');

        return matchCount > 1 ? highlighted : word;
      })
      .join(' '),
  }));

  return withHighlight;
};

const clientSuggestionsAtom = selector<SearchSuggestionType[] | null>({
  key: 'clientSuggestionsAtom',
  get: ({ get }) => {
    const hasCollectionDependency = get(hasCollectionDependencyAtom);
    const clearSearchQuery = get(clearSearchQueryAtom);

    if (!hasCollectionDependency || clearSearchQuery) {
      return null;
    }

    const activeNode = get(searchQueryActiveNodeAtom);
    const term = get(searchQueryTermAtom);

    if (!activeNode) {
      return null;
    }

    const searchAggs = get(searchAggsByNodeAtom(activeNode.id));

    return getClientSuggestions(term, searchAggs);
  },
});

export default clientSuggestionsAtom;
