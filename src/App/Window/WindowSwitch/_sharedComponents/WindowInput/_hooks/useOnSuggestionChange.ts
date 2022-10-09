import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import usePushWindowHash from '../../../../../_hooks/usePushWindowHash';
import windowStateAtom from '../../../../_atoms/windowStateAtom';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import useAddCollectionQueryNode from '../../../_hooks/useAddCollectionQueryNode';
import searchQueryDebouncedTermAtom from '../_atoms/searchQueryDebouncedTermAtom';
import searchQueryTermAtom from '../_atoms/searchQueryTermAtom';
import SearchSuggestionType from '../_types/SearchSuggestionType';
import useAddAttributeQueryNode from './useAddAttributeQueryNode';
import useAddGroupQueryNode from './useAddGroupQueryNode';
import useAddTextQueryNode from './useAddTextQueryNode';
import useRemoveSelection from './useRemoveSelection';
import useUpdateAttributeQueryNode from './useUpdateAttributeQueryNode';

const useUpdateFromSuggestion = () => {
  const addAttributeQueryNode = useAddAttributeQueryNode();
  const updateAttributeQueryNode = useUpdateAttributeQueryNode();
  const addCollectionQueryNode = useAddCollectionQueryNode();
  const activeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const windowState = useRecoilValue(windowStateAtom);
  const pushWindowHash = usePushWindowHash();
  const addTextQueryNode = useAddTextQueryNode();
  const addGroupQueryNode = useAddGroupQueryNode();
  const removeSelection = useRemoveSelection();

  return (suggestion: SearchSuggestionType) => {
    switch (suggestion.group) {
      case 'Attribute':
        if (!activeMeta) {
          return;
        }

        return activeMeta.type === 'query'
          ? updateAttributeQueryNode(
              activeMeta.nodeId,
              suggestion.attributeMeta.value
            )
          : addAttributeQueryNode(
              suggestion.attributeMeta.key,
              suggestion.attributeMeta.value
            );
      case 'Collections':
        return addCollectionQueryNode(suggestion.collectionId);
      case 'Explorer':
        return pushWindowHash({
          tabId: windowState.tabId,
          type: suggestion.type,
          state: suggestion.meta,
        });
      case 'Selection':
        if (suggestion.action === 'remove') {
          return removeSelection();
        }
        return addGroupQueryNode();
      case 'Search':
        return addTextQueryNode();
      default:
    }
  };
};

const useOnSuggestionChange = () => {
  const updateFromSuggestion = useUpdateFromSuggestion();
  const [activeMeta, setActiveMeta] = useRecoilState(
    searchQueryActiveNodeMetaAtom
  );
  const setTerm = useSetRecoilState(searchQueryTermAtom);
  const setDebounceTerm = useSetRecoilState(searchQueryDebouncedTermAtom);

  return (suggestion: SearchSuggestionType) => {
    updateFromSuggestion(suggestion);

    if (
      suggestion.group !== 'Selection' &&
      activeMeta &&
      activeMeta.type === 'group'
    ) {
      setActiveMeta({
        ...activeMeta,
        index: activeMeta.index + 1,
      });
    }

    setTerm('');
    setDebounceTerm('');
  };
};

export default useOnSuggestionChange;
