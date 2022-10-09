import React from 'react';
import { useRecoilValue } from 'recoil';
import searchQueryRootNodeAtom from '../../../../_atoms/searchQueryRootNodeAtom';
import QueryPartContainer from '../_sharedComponents/QueryPartContainer';
import GroupRenderNodeType from '../_types/GroupRenderNodeType';
import GroupEndIcon from './GroupEndIcon';

const stylesStart = {
  marginRight: '-4px',
};

const stylesEnd = {
  marginLeft: '-4px',
};

function RenderGroupEnds({ renderNode }: { renderNode: GroupRenderNodeType }) {
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);

  if (!rootNode) {
    return null;
  }

  const isRoot = rootNode.id === renderNode.node.id;

  if (isRoot) {
    return null;
  }

  const stroke = renderNode.inActiveBranch ? '#276EF1' : '#B0C8F4';

  return (
    <QueryPartContainer
      style={{
        ...(renderNode.type === 'groupStart' ? stylesStart : {}),
        ...(renderNode.type === 'groupEnd' ? stylesEnd : {}),
      }}
      renderNode={renderNode}
    >
      {!isRoot && <GroupEndIcon type={renderNode.type} stroke={stroke} />}
    </QueryPartContainer>
  );
}

export default RenderGroupEnds;
