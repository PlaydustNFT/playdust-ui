import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { useCallback } from 'react';
import TokenCard from '../../../_sharedComponents/TokenCard/TokenCard';
import VirtualizedGrid from './_sharedComponents/VirtualizedGrid';
import type TokenListProps from './_types/TokenListProps';
import type VirtualizedGridChildProps from './_types/VirtualizedGridChildProps';

const RowContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

interface RowRendererProps {
  parentProps: TokenListProps;
  gridProps: VirtualizedGridChildProps;
}

function RowRenderer({ parentProps, gridProps }: RowRendererProps) {
  const { tokens, initialized, total } = parentProps;
  const { index } = gridProps;
  const { cardsPerRow } = gridProps;
  const startingIdx = cardsPerRow * index;
  const tokenRange = Array.from(Array(cardsPerRow).keys());
  const justifyContent = cardsPerRow > 2 ? 'space-between' : 'space-evenly';

  const imageSize = gridProps.imageSize || parentProps.imageSize;

  return (
    <RowContainer
      style={{
        justifyContent,
        marginRight: parentProps.cardGap,
      }}
    >
      {tokenRange.map((tokenIdx) => {
        const actualIdx = startingIdx + tokenIdx;
        const metadata = tokens[actualIdx];

        if (!initialized) {
          return (
            <TokenCard
              skeleton={true}
              key={actualIdx}
              imageSize={imageSize}
              contentHeight={parentProps.contentHeight}
            />
          );
        }

        return actualIdx < total ? (
          <TokenCard
            key={metadata?.mint || actualIdx}
            metadata={metadata}
            imageSize={imageSize}
            contentHeight={parentProps.contentHeight}
          />
        ) : (
          <div
            key={tokenIdx}
            style={{
              width: imageSize,
              height: imageSize,
            }}
          />
        );
      })}
    </RowContainer>
  );
}

function TokenList(props: TokenListProps) {
  const {
    initialized,
    tokens,
    total,
    imageSize,
    cardGap,
    contentHeight,
    rowGap,
  } = props;

  const rowWrapper = useCallback<
    (gridprops: VirtualizedGridChildProps) => JSX.Element
  >(
    (gridProps) => <RowRenderer gridProps={gridProps} parentProps={props} />,
    [props]
  );

  return (
    <VirtualizedGrid
      content={
        props.content && (
          <Box style={{ margin: cardGap, marginLeft: 0 }}>{props.content}</Box>
        )
      }
      initialized={initialized}
      next={props.next}
      getRowMeta={(width, height, isLoading) => {
        const cardsPerRow = Math.floor(width / (imageSize + cardGap)) || 1;

        const dynamicImageSize = Math.floor(width / cardsPerRow - cardGap);

        const rowHeight = dynamicImageSize + contentHeight + rowGap;

        const cardRows = initialized
          ? Math.ceil(tokens.length / cardsPerRow) || 0
          : Math.ceil(height / rowHeight);

        const maxRows = initialized
          ? Math.ceil(total / cardsPerRow) || 0
          : cardRows;

        const loadingRowOffset = isLoading ? 1 : 0;

        const rowCount = initialized
          ? Math.min(cardRows + loadingRowOffset, maxRows)
          : cardRows;

        const hasMore = total > tokens.length;

        return {
          imageSize: dynamicImageSize,
          rowHeight,
          rowCount,
          hasMore,
          cardsPerRow,
        };
      }}
      rowRenderer={rowWrapper}
    />
  );
}

export default TokenList;
