import React from 'react';
import { useRecoilValue } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQuerySelectedNodesAtom from '../_atoms/searchQuerySelectedNodesAtom';
import searchQueryRenderNodeMetaAtom from './_atoms/searchQueryRenderNodeMetaAtom';
import QueryPartContainer from './_sharedComponents/QueryPartContainer';
import GroupRenderOperatorNodeType from './_types/GroupRenderOperatorNodeType';

const secondaryHighlight = {
  color: 'rgb(180,180,180)',
  fontWeight: 'bold',
};

function RenderGroupOperator({
  renderNode,
}: {
  renderNode: GroupRenderOperatorNodeType;
}) {
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);
  const { isActive } = useRecoilValue(
    searchQueryRenderNodeMetaAtom(renderNode)
  );
  const selectedNodes = useRecoilValue(searchQuerySelectedNodesAtom);

  const isBelowOperator =
    renderNode.activeDistance !== null &&
    renderNode.inActiveBranch &&
    renderNode.activeDistance === 1;
  const isAboveOperator =
    renderNode.activeDistance !== null &&
    renderNode.inActiveBranch &&
    renderNode.activeDistance === -1;

  const activeNodeIndex =
    activeNodeMeta?.type === 'group' ? activeNodeMeta.index : -1;

  // first operator in a group is hidden unless input is placed there.
  if (renderNode.index === 0) {
    if (activeNodeIndex !== 0 || !isActive) {
      return null;
    }
  }

  // hide first operator in group if first child is selected
  if (
    isActive &&
    renderNode.index === 0 &&
    selectedNodes.length > 0 &&
    activeNodeMeta?.type === 'group' &&
    (activeNodeMeta.index === 0 || activeNodeMeta?.endIndex === 0)
  ) {
    return null;
  }

  return (
    <QueryPartContainer
      style={{
        ...(isBelowOperator || isAboveOperator ? secondaryHighlight : {}),
      }}
      renderNode={renderNode}
    >
      {renderNode.node.operator.toUpperCase()}
    </QueryPartContainer>
  );
}

export default RenderGroupOperator;
