import { selectorFamily } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchStateAtom from '../../../../_atoms/searchStateAtom';
import searchQueryActiveNodeAtom from '../../_atoms/searchQueryActiveNodeAtom';
import searchQuerySelectedNodesAtom from '../../_atoms/searchQuerySelectedNodesAtom';
import RenderMapNodeType from '../_types/RenderMapNodeType';
import searchQueryPathToRootAtom from './searchQueryPathToRootAtom';

type SearchQueryRenderNodeMetaAtomType = {
  isActive: boolean;
  highlightBackground: boolean;
  renderLineBelow: boolean;
  renderLineAbove: boolean;
};

const searchQueryRenderNodeIsSelectedAtom = selectorFamily<
  boolean,
  RenderMapNodeType
>({
  key: 'searchQueryRenderNodeIsSelectedAtom',
  get:
    (renderNode) =>
    ({ get }) => {
      const selectedNodes = get(searchQuerySelectedNodesAtom);
      const activeNode = get(searchQueryActiveNodeAtom);
      const isEmptyGroup =
        activeNode?.type === 'group' && activeNode.children.length === 0;

      if (selectedNodes.length === 0 && !isEmptyGroup) {
        return false;
      }

      const { query } = get(searchStateAtom);
      const pathToRoot = get(
        searchQueryPathToRootAtom(renderNode.node.id)
      ).filter((entry) => entry !== query.rootId);
      const activeNodeMeta = get(searchQueryActiveNodeMetaAtom);

      const intersections = selectedNodes.filter((selected) =>
        pathToRoot.includes(selected)
      );

      if (intersections.length) {
        return true;
      }

      if (selectedNodes.includes(renderNode.node.id)) {
        return true;
      }

      if (
        renderNode.type === 'groupOperator' &&
        renderNode.node.id === activeNodeMeta?.nodeId
      ) {
        const assignedChild = renderNode.node.children[renderNode.index];
        const foundIndex = selectedNodes.findIndex(
          (entry) => entry === assignedChild
        );

        if (foundIndex >= 1) {
          return true;
        }
      }

      return false;
    },
});

const searchQueryRenderNodeMetaAtom = selectorFamily<
  SearchQueryRenderNodeMetaAtomType,
  RenderMapNodeType
>({
  key: 'searchQueryRenderNodeMetaAtom',
  get:
    (renderNode: RenderMapNodeType) =>
    ({ get }) => {
      const isSelected = get(searchQueryRenderNodeIsSelectedAtom(renderNode));
      const selectedNodes = get(searchQuerySelectedNodesAtom);

      const isBelowActive =
        renderNode.activeDistance !== null &&
        renderNode.activeDistance >= 1 &&
        renderNode.inActiveBranch;

      const isActive =
        renderNode.activeDistance !== null &&
        renderNode.activeDistance === 0 &&
        renderNode.inActiveBranch;

      // const higlightBackground =
      //   isSelected || (isBelowActive && selectedNodes.length === 0);
      const highlightBackground = isSelected;

      const renderLineBelow =
        renderNode.activeDistance !== null &&
        renderNode.activeDistance >= 0 &&
        !selectedNodes.length;

      const renderLineAbove =
        renderNode.activeDistance !== null &&
        renderNode.activeDistance >= 2 &&
        renderNode.inActiveBranch &&
        !selectedNodes.length;

      return {
        isActive,
        highlightBackground,
        renderLineBelow,
        renderLineAbove,
      };
    },
});

export default searchQueryRenderNodeMetaAtom;
