import styled from '@emotion/styled';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../../_atoms/searchQueryActiveNodeMetaAtom';
import searchSuggestionsForcedClosedAtom from '../../_atoms/searchSuggestionsForcedClosedAtom';
import searchQueryRenderNodeMetaAtom from '../_atoms/searchQueryRenderNodeMetaAtom';
import RenderMapNodeType from '../_types/RenderMapNodeType';

type RootContainerProps = {
  highlightBackground: boolean;
  highlightColor: boolean;
};

interface QueryPartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  renderNode: RenderMapNodeType;
  highlightBackground?: boolean;
  highlightColor?: boolean;
  disableLineAbove?: boolean;
}

const RootContainer = styled.div<RootContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 4px;
  margin: 12px 0px;
  background: ${({ highlightBackground }) =>
    highlightBackground ? '#DCE8FD' : 'auto'};
  color: ${({ highlightColor }) => (highlightColor ? '#276EF1' : 'auto')};
  font-weight: ${({ highlightColor }) => (highlightColor ? 'bold' : 'auto')};
`;

type QueryPartDecoratorProps = {
  position: 'above' | 'below';
};

const QueryPartDecorator = styled.div<QueryPartDecoratorProps>`
  position: absolute;
  width: 100%;
  height: ${({ position }) => (position === 'above' ? '1px' : '2px')};
  top: ${({ position }) => (position === 'above' ? '-7px' : 'auto')};
  bottom: ${({ position }) => (position === 'below' ? '-7px' : 'auto')};
  left: 0px;
  background: ${({ position }) =>
    position === 'below' ? '#DCE8FD' : '#276EF1'};
`;

function QueryPartContainer({
  renderNode,
  highlightBackground,
  highlightColor,
  disableLineAbove,
  children,
  style,
  onClick,
}: QueryPartContainerProps) {
  const setActiveNodeMeta = useSetRecoilState(searchQueryActiveNodeMetaAtom);
  const styleMeta = useRecoilValue(searchQueryRenderNodeMetaAtom(renderNode));
  const setForcedClose = useSetRecoilState(searchSuggestionsForcedClosedAtom);

  return (
    <RootContainer
      highlightBackground={highlightBackground || styleMeta.highlightBackground}
      highlightColor={highlightColor || styleMeta.isActive}
      style={style}
      onClick={(evt) => {
        setForcedClose(false);

        setActiveNodeMeta(() => {
          if (renderNode.type === 'query') {
            return {
              type: 'query',
              nodeId: renderNode.node.id,
            };
          }

          if (
            renderNode.type === 'groupEnd' ||
            renderNode.type === 'groupStart'
          ) {
            const index =
              renderNode.type === 'groupStart'
                ? 0
                : renderNode.node.children.length;

            return {
              type: 'group',
              nodeId: renderNode.node.id,
              index,
            };
          }

          if (renderNode.type === 'groupOperator') {
            return {
              type: 'group',
              nodeId: renderNode.node.id,
              index: renderNode.index,
            };
          }

          return null;
        });

        if (onClick) {
          onClick(evt);
        }

        evt.stopPropagation();
      }}
    >
      {children}
      {styleMeta.renderLineBelow && <QueryPartDecorator position="below" />}
      {!disableLineAbove && styleMeta.renderLineAbove && (
        <QueryPartDecorator position="above" />
      )}
    </RootContainer>
  );
}

export default QueryPartContainer;
