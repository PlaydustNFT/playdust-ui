import { selector } from 'recoil';
import { is } from 'superstruct';
import searchQueryActiveNodeMetaAtom from '../../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryParentIdMapAtom from '../../../../_atoms/searchQueryParentIdMapAtom';
import searchStateAtom from '../../../../_atoms/searchStateAtom';
import GroupNodeType from '../../../../_types/GroupNodeType';
import SearchQueryActiveNodeType from '../../../../_types/SearchActiveNodeMetaType';
import SearchQueryParentIdMapType from '../../../../_types/SearchQueryParentIdMapType';
import type SearchQueryType from '../../../../_types/SearchQueryType';
import RenderMapNodeType from '../_types/RenderMapNodeType';

type RenderMap = RenderMapNodeType[];
type GroupedRenderMap = RenderMap[];

const makeRenderMap = (
  nodes: SearchQueryType['nodes'],
  rootId: string,
  activeNode: SearchQueryActiveNodeType | null,
  parentIdMap: SearchQueryParentIdMapType
): RenderMap => {
  const renderMap: RenderMap = [];
  const activeSearchQueryNode = activeNode?.nodeId
    ? nodes[activeNode?.nodeId] ?? null
    : null;
  const activeNodeParents: string[] = [];

  if (activeSearchQueryNode) {
    let currentId: string | null = activeSearchQueryNode.id;
    while (currentId !== null) {
      activeNodeParents.push(currentId);
      currentId = parentIdMap[currentId];
    }
  }

  function traverse(
    id: string,
    activeDistance: number | null,
    inActiveBranch: boolean,
    parent?: GroupNodeType
  ): void {
    const node = nodes[id];

    let newActiveDistance = activeDistance;
    let newInActiveBranch = false;
    if (newActiveDistance !== null) {
      if (activeNodeParents.includes(id)) {
        newInActiveBranch = true;
      } else if (newActiveDistance > 0) {
        newInActiveBranch = inActiveBranch;
      }
      if (activeNodeParents.includes(id) || newActiveDistance >= 0) {
        newActiveDistance += 1;
      }
    }

    if (is(node, GroupNodeType)) {
      renderMap.push({
        type: 'groupStart',
        parent: parent ?? null,
        node,
        inActiveBranch: newInActiveBranch,
        activeDistance,
      });
      node.children.forEach((childId, index) => {
        renderMap.push({
          type: 'groupOperator',
          parent: parent ?? null,
          node,
          index,
          inActiveBranch: newInActiveBranch,
          activeDistance,
        });

        traverse(childId, newActiveDistance, newInActiveBranch, node);
      });
      renderMap.push({
        type: 'groupEnd',
        parent: parent ?? null,
        node,
        inActiveBranch: newInActiveBranch,
        activeDistance,
      });
    } else if (parent) {
      renderMap.push({
        type: 'query',
        parent: parent ?? null,
        node,
        inActiveBranch: newInActiveBranch,
        activeDistance,
      });
    }
  }

  traverse(
    rootId,
    activeNodeParents.length > 0 ? -(activeNodeParents.length - 1) : null,
    false
  );

  return renderMap;
};

const searchQueryRenderMapAtom = selector<GroupedRenderMap>({
  key: 'searchQueryRenderMapAtom',
  get: ({ get }) => {
    const { rootId, nodes } = get(searchStateAtom).query;
    const activeNodeMeta = get(searchQueryActiveNodeMetaAtom);
    const parentIdMap = get(searchQueryParentIdMapAtom);

    const renderMap = makeRenderMap(nodes, rootId, activeNodeMeta, parentIdMap);

    // group query to controll line-wraps (always before operators)
    const groupedRenderMap: GroupedRenderMap = [];
    let currentGroup: RenderMap = [];
    renderMap.forEach((node, i) => {
      if (
        node.type === 'groupOperator' &&
        renderMap[i - 1].type !== 'groupStart'
      ) {
        groupedRenderMap.push(currentGroup);
        currentGroup = [];
      }
      currentGroup.push(node);
    });
    groupedRenderMap.push(currentGroup);

    return groupedRenderMap;
  },
});

export default searchQueryRenderMapAtom;
