import React from 'react';
import QueryNodeType from '../../../_types/QueryNodeType';
import QueryPartContainer from './_sharedComponents/QueryPartContainer';
import QueryRenderNodeType from './_types/QueryRenderNodeType';

type RenderQueryNodeProps = {
  renderNode: QueryRenderNodeType;
  renderChipInput: (queryNode: QueryNodeType) => JSX.Element;
};

function RenderQueryNode({
  renderNode,
  renderChipInput,
}: RenderQueryNodeProps) {
  return (
    <QueryPartContainer renderNode={renderNode}>
      {renderChipInput(renderNode.node)}
    </QueryPartContainer>
  );
}

export default RenderQueryNode;
