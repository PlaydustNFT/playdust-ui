import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import shortId from '../../../../../_helpers/shortId';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryRootNodeAtom from '../../../_atoms/searchQueryRootNodeAtom';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import insertAtIdx from '../../../_helpers/insertAtIdx';
import makeUseChangeSearchQuery from '../../../_hooks/makeUseChangeSearchQuery';
import useGetUpdateSearchQuery from '../../../_hooks/useGetUpdateSearchQuery';
import GroupNodeType from '../../../_types/GroupNodeType';
import SearchQueryType from '../../../_types/SearchQueryType';
import searchQueryActiveNodeAtom from '../_atoms/searchQueryActiveNodeAtom';
import searchQuerySelectedNodesAtom from '../_atoms/searchQuerySelectedNodesAtom';

const useAddGroupQueryNode = makeUseChangeSearchQuery(() => {
  const [activeNodeMeta, setActiveNodeMeta] = useRecoilState(
    searchQueryActiveNodeMetaAtom
  );
  const activeNode = useRecoilValue(searchQueryActiveNodeAtom);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const { query } = useRecoilValue(searchStateAtom);
  const getUpdateSearchQuery = useGetUpdateSearchQuery();
  const selectedNodes = useRecoilValue(searchQuerySelectedNodesAtom);

  const getNextState = useCallback(
    (newId: string): { query: SearchQueryType; index: number } | null => {
      if (activeNode?.type !== 'group' || activeNodeMeta?.type !== 'group') {
        return null;
      }

      const operator = activeNode.operator === 'and' ? 'or' : 'and';
      const isRootNode = activeNode.id === rootNode?.id;
      const unSelectedNodes = activeNode.children.filter(
        (entry) => !selectedNodes.includes(entry)
      );
      const minSelectionIndex = Math.min(
        activeNodeMeta.index,
        activeNodeMeta.endIndex === undefined
          ? activeNodeMeta.index
          : activeNodeMeta.endIndex
      );

      // Adding empty group within current emtpy group
      if (unSelectedNodes.length === 0 && selectedNodes.length === 0) {
        const newNode: GroupNodeType = {
          id: newId,
          type: 'group',
          operator,
          children: [],
        };

        const updatedQuery = {
          ...query,
          nodes: {
            ...query.nodes,
            [activeNode.id]: {
              ...activeNode,
              children: [newNode.id],
            },
            [newNode.id]: newNode,
          },
        };

        return {
          query: updatedQuery,
          index: 0,
        };
      }

      // Not all nodes in group are selected, and only one selected node
      if (unSelectedNodes.length && selectedNodes.length <= 1) {
        const newNode: GroupNodeType = {
          id: newId,
          type: 'group',
          operator,
          children: selectedNodes,
        };

        const updatedActiveNode: GroupNodeType = {
          ...activeNode,
          children: insertAtIdx(unSelectedNodes, newNode.id, minSelectionIndex),
        };

        const updatedQuery = {
          ...query,
          nodes: {
            ...query.nodes,
            [updatedActiveNode.id]: updatedActiveNode,
            [newNode.id]: newNode,
          },
        };

        return {
          query: updatedQuery,
          index: newNode.children.length,
        };
      }

      // Not all nodes in group are selected, and more than one selected node
      if (unSelectedNodes.length && selectedNodes.length > 1) {
        const subGroupNode: GroupNodeType = {
          id: shortId(),
          type: 'group',
          operator: activeNode.operator,
          children: selectedNodes,
        };

        const newNode: GroupNodeType = {
          id: newId,
          type: 'group',
          operator,
          children: [subGroupNode.id],
        };

        const updatedActiveNode: GroupNodeType = {
          ...activeNode,
          children: insertAtIdx(unSelectedNodes, newNode.id, minSelectionIndex),
        };

        const updatedQuery = {
          ...query,
          nodes: {
            ...query.nodes,
            [updatedActiveNode.id]: updatedActiveNode,
            [newNode.id]: newNode,
            [subGroupNode.id]: subGroupNode,
          },
        };

        return {
          query: updatedQuery,
          index: newNode.children.length,
        };
      }

      const newNode: GroupNodeType = {
        id: newId,
        type: 'group',
        operator,
        children: [activeNode.id],
      };

      // All nodes are selected, and root node is active
      if (isRootNode) {
        const updatedQuery = {
          rootId: newNode.id,
          nodes: {
            [newNode.id]: newNode,
            ...query.nodes,
          },
        };

        return {
          query: updatedQuery,
          index: 1,
        };
      }

      // All nodes are selected, but not at root node
      const updated = getUpdateSearchQuery((node) => {
        if (node.type === 'group' && node.id !== newNode.id) {
          return {
            ...node,
            children: node.children.map((child) => {
              if (child === activeNode.id) {
                return newNode.id;
              }

              return child;
            }),
          };
        }

        return node;
      }, newNode);

      return {
        query: updated.query,
        index: 1,
      };
    },
    [
      activeNode,
      activeNodeMeta,
      getUpdateSearchQuery,
      query,
      rootNode?.id,
      selectedNodes,
    ]
  );

  return () => {
    const newId = shortId();
    const nextState = getNextState(newId);

    if (!nextState) {
      return;
    }

    setActiveNodeMeta({
      nodeId: newId,
      type: 'group',
      index: nextState.index,
    });

    return { query: nextState.query };
  };
});

export default useAddGroupQueryNode;
