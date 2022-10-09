import { useCallback } from 'react';
import { useEvent } from 'react-use';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import activeWindowAtom from '../../../../../_atoms/activeWindowAtom';
import clearSearchQueryAtom from '../../../_atoms/clearSearchQueryAtom';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryParentIdMapAtom from '../../../_atoms/searchQueryParentIdMapAtom';
import searchQueryRootNodeAtom from '../../../_atoms/searchQueryRootNodeAtom';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import GroupNodeType from '../../../_types/GroupNodeType';
import SearchQueryNodeType from '../../../_types/SearchQueryNodeType';
import searchQueryActiveNodeAtom from '../_atoms/searchQueryActiveNodeAtom';
import searchQuerySelectedNodesAtom from '../_atoms/searchQuerySelectedNodesAtom';
import searchQueryTermAtom from '../_atoms/searchQueryTermAtom';
import searchSuggestionIdxAtom from '../_atoms/searchSuggestionIdxAtom';
import searchSuggestionsAtom from '../_atoms/searchSuggestionsAtom';
import searchSuggestionsForcedClosedAtom from '../_atoms/searchSuggestionsForcedClosedAtom';
import useAddGroupQueryNode from './useAddGroupQueryNode';
import useOnSuggestionChange from './useOnSuggestionChange';
import useRemoveSelection from './useRemoveSelection';

const getIndexInParent = (parent: GroupNodeType, id: string) =>
  parent.children.findIndex((nodeId) => nodeId === id);

const useHandleLR = () => {
  const searchTerm = useRecoilValue(searchQueryTermAtom);
  const [activeNodeMeta, setActiveNodeMeta] = useRecoilState(
    searchQueryActiveNodeMetaAtom
  );
  const activeNode = useRecoilValue(searchQueryActiveNodeAtom);
  const parentIdMap = useRecoilValue(searchQueryParentIdMapAtom);
  const { query } = useRecoilValue(searchStateAtom);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);

  return (evt: KeyboardEvent, isLeft: boolean) => {
    if (!activeNodeMeta || searchTerm !== '') {
      return;
    }
    const isGroup = GroupNodeType.is(activeNode);
    const parentId = parentIdMap[activeNodeMeta.nodeId];
    const parent: SearchQueryNodeType | null = parentId
      ? query.nodes[parentId] ?? null
      : null;
    const isParentGroup = GroupNodeType.is(parent);

    if (!activeNode || !rootNode) {
      return;
    }

    const offset = isLeft ? 0 : 1;

    if (activeNodeMeta?.type === 'query' && isParentGroup) {
      setActiveNodeMeta({
        type: 'group',
        index: getIndexInParent(parent, activeNodeMeta.nodeId) + offset,
        nodeId: parent.id,
      });
    }

    if (
      activeNodeMeta.type === 'group' &&
      activeNodeMeta.endIndex !== undefined
    ) {
      const range = [activeNodeMeta.index, activeNodeMeta.endIndex];
      const nextIndex = isLeft ? Math.min(...range) : Math.max(...range);

      return setActiveNodeMeta({
        ...activeNodeMeta,
        index: nextIndex,
        endIndex: undefined,
      });
    }

    if (activeNodeMeta.type === 'group' && isGroup) {
      let newIndex = isLeft
        ? Math.max(activeNodeMeta.index - 1, 0)
        : Math.min(activeNodeMeta.index + 1, activeNode.children.length);
      let newNodeId = activeNodeMeta.nodeId;

      const nextNode = isLeft
        ? activeNodeMeta.index > 0 && query.nodes[activeNode.children[newIndex]]
        : activeNodeMeta.index < activeNode.children.length &&
          query.nodes[activeNode.children[activeNodeMeta.index]];

      const endGroupIdx = isLeft ? 0 : activeNode.children.length;

      // move to begin/end of root node
      if (evt.metaKey) {
        return setActiveNodeMeta({
          type: 'group',
          index: isLeft ? 0 : rootNode.children.length,
          nodeId: rootNode.id,
        });
      }

      // move into next group.
      if (!evt.altKey && GroupNodeType.is(nextNode)) {
        newIndex = isLeft ? nextNode.children.length : 0;
        newNodeId = nextNode.id;
      }

      // move out of current group.
      if (
        !evt.altKey &&
        activeNodeMeta.index === endGroupIdx &&
        isParentGroup
      ) {
        newIndex = getIndexInParent(parent, activeNodeMeta.nodeId) + offset;
        newNodeId = parent.id;
      }

      setActiveNodeMeta({
        type: 'group',
        index: newIndex,
        nodeId: newNodeId,
      });
    }
  };
};

const useHandleShiftLR = () => {
  const [activeNodeMeta, setActiveNodeMeta] = useRecoilState(
    searchQueryActiveNodeMetaAtom
  );
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const activeNode = useRecoilValue(searchQueryActiveNodeAtom);
  const selectedNodes = useRecoilValue(searchQuerySelectedNodesAtom);
  const parentIdMap = useRecoilValue(searchQueryParentIdMapAtom);
  const { query } = useRecoilValue(searchStateAtom);

  return (isLeft: boolean) => {
    const isGroup = GroupNodeType.is(activeNode);

    if (rootNode && isGroup && activeNodeMeta?.type === 'group') {
      const { endIndex, index } = activeNodeMeta;
      const currentEndIndex = endIndex === undefined ? index : endIndex;
      const endIdxOffset = isLeft ? -1 : 1;
      const nextEndIdx = currentEndIndex + endIdxOffset;
      const atEnd = isLeft
        ? nextEndIdx === -1
        : nextEndIdx === activeNode.children.length + 1;

      if (!atEnd) {
        return setActiveNodeMeta({
          ...activeNodeMeta,
          endIndex: nextEndIdx,
        });
      }

      const parentId = parentIdMap[activeNodeMeta.nodeId];
      const parentNode = parentId && query.nodes[parentId];

      if (
        activeNodeMeta.nodeId !== rootNode.id &&
        activeNode.children.join(',') === selectedNodes.join(',') &&
        GroupNodeType.is(parentNode)
      ) {
        const indexInParent = getIndexInParent(
          parentNode,
          activeNodeMeta.nodeId
        );

        return setActiveNodeMeta({
          type: 'group',
          nodeId: parentNode.id,
          index: isLeft ? indexInParent + 1 : indexInParent,
          endIndex: isLeft ? indexInParent : indexInParent + 1,
        });
      }
    }
  };
};

const useHandleUD = () => {
  const [activeIdx, setActiveIdx] = useRecoilState(searchSuggestionIdxAtom);
  const { suggestions } = useRecoilValue(searchSuggestionsAtom);
  const lastSuggestionIdx = suggestions.length - 1;

  return (isUp: boolean) => {
    const nextUpValue = activeIdx === 0 ? lastSuggestionIdx : activeIdx - 1;
    const nextDownValue = activeIdx === lastSuggestionIdx ? 0 : activeIdx + 1;
    const nextValue = isUp ? nextUpValue : nextDownValue;

    setActiveIdx(nextValue);
  };
};

const useHandleEnter = () => {
  const onSuggestionChange = useOnSuggestionChange();
  const activeIdx = useRecoilValue(searchSuggestionIdxAtom);
  const { suggestions } = useRecoilValue(searchSuggestionsAtom);

  return () => onSuggestionChange(suggestions[activeIdx]);
};

const useHandleZ = () => {
  const activeWindow = useRecoilValue(activeWindowAtom);
  const [clearSearchQuery, setClearSearchQuery] =
    useRecoilState(clearSearchQueryAtom);

  return (evt: KeyboardEvent) => {
    if (activeWindow?.type !== 'search') {
      return;
    }

    if (evt.metaKey && evt.shiftKey) {
      return window.history.forward();
    }

    if (clearSearchQuery) {
      return setClearSearchQuery(false);
    }

    if (evt.metaKey) {
      return window.history.back();
    }
  };
};

const useHandleBackspace = () => {
  const selectedNodes = useRecoilValue(searchQuerySelectedNodesAtom);
  const removeSelection = useRemoveSelection();
  const activeNode = useRecoilValue(searchQueryActiveNodeAtom);
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const term = useRecoilValue(searchQueryTermAtom);
  const handleShiftLR = useHandleShiftLR();

  return (isLeft: boolean) => {
    if (selectedNodes.length) {
      return removeSelection();
    }

    const isEmptyTerm = term === '';

    if (activeNodeMeta?.type === 'query' && isEmptyTerm) {
      return removeSelection();
    }

    if (
      activeNodeMeta?.type === 'group' &&
      activeNode?.type === 'group' &&
      term === ''
    ) {
      handleShiftLR(isLeft);
    }
  };
};

const useWindowInputKeyEvent = () => {
  const handleLR = useHandleLR();
  const handleShiftLR = useHandleShiftLR();
  const handleUD = useHandleUD();
  const handleEnter = useHandleEnter();
  const handleBackspace = useHandleBackspace();
  const handleZ = useHandleZ();
  const addGroupQueryNode = useAddGroupQueryNode();
  const setForcedClose = useSetRecoilState(searchSuggestionsForcedClosedAtom);
  const setActiveNodeMeta = useSetRecoilState(searchQueryActiveNodeMetaAtom);
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const searchTerm = useRecoilValue(searchQueryTermAtom);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (!activeNodeMeta && searchTerm === '') {
        return;
      }

      switch (evt.key) {
        case 'ArrowLeft':
        case 'ArrowRight': {
          const isLeft = evt.key === 'ArrowLeft';

          if (evt.shiftKey) {
            return handleShiftLR(isLeft);
          }

          return handleLR(evt, isLeft);
        }
        case 'ArrowUp':
        case 'ArrowDown':
          return handleUD(evt.key === 'ArrowUp');
        case 'Enter':
          return handleEnter();
        case 'Backspace':
        case 'Delete':
          return handleBackspace(evt.key === 'Backspace');
        case 'Escape':
          setActiveNodeMeta(null);
          return setForcedClose(true);
        case '(':
        case ')':
          return addGroupQueryNode();
        case 'z':
          return handleZ(evt);
        default:
      }
    },
    [
      activeNodeMeta,
      searchTerm,
      handleUD,
      handleEnter,
      handleBackspace,
      setActiveNodeMeta,
      setForcedClose,
      addGroupQueryNode,
      handleZ,
      handleLR,
      handleShiftLR,
    ]
  );

  useEvent('keydown', onKeyDown);
};

export default useWindowInputKeyEvent;
