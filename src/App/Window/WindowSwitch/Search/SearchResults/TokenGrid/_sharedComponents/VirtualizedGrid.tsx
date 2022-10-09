import styled from '@emotion/styled';
import { useDebounceCallback } from '@react-hook/debounce';
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  AutoSizer,
  InfiniteLoader,
  List as ReactVirtualizedList,
  ListProps,
  ListRowRenderer,
  WindowScroller,
  WindowScrollerChildProps,
} from 'react-virtualized';
import RowMetaProps from '../_types/RowMetaProps';
import VirtualizedGridChildProps from '../_types/VirtualizedGridChildProps';

const RootContainer = styled.div`
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface VirtualizedGridProps {
  getRowMeta: (
    width: number,
    height: number,
    isLoading: boolean
  ) => RowMetaProps;
  rowRenderer: (childProps: VirtualizedGridChildProps) => React.ReactElement;
  initialized: boolean;
  next?: () => Promise<void>;
  content?: ReactNode;
}

interface AutoSizedContainerProps
  extends Omit<VirtualizedGridProps, 'content'> {
  windowScrollerProps: WindowScrollerChildProps;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  width: number;
}

function List(props: ListProps) {
  const listRef = useRef<ReactVirtualizedList>(null);

  useEffect(() => {
    listRef.current?.recomputeGridSize();
  }, [props.rowHeight]);

  return (
    <ReactVirtualizedList {...props} height={props.height} ref={listRef} />
  );
}

function AutoSizedContainer(props: AutoSizedContainerProps) {
  const {
    rowRenderer,
    isLoading,
    setIsLoading,
    next,
    initialized,
    getRowMeta,
    width,
    windowScrollerProps: {
      height = 0,
      isScrolling,
      onChildScroll,
      scrollTop,
      registerChild,
    },
  } = props;

  const meta = useMemo(
    () => getRowMeta(width, height, isLoading),
    [getRowMeta, width, height, isLoading]
  );

  const { rowHeight, rowCount, hasMore } = meta;

  const rowWrapper = useCallback<ListRowRenderer>(
    ({ key, style, index }) => (
      <div
        key={key}
        style={{ ...style, marginLeft: 1, width: 'calc(100% - 1px)' }}
      >
        {rowRenderer({ index, isLoading, ...meta })}
      </div>
    ),
    [rowRenderer, isLoading, meta]
  );

  return (
    <div
      ref={registerChild}
      style={{
        height,
        width,
      }}
    >
      <InfiniteLoader
        isRowLoaded={({ index }) => {
          if (!hasMore || !initialized) {
            return true;
          }
          return index + 1 < rowCount;
        }}
        loadMoreRows={async () => {
          if (next && !isLoading) {
            setIsLoading(true);
            await next();
            setIsLoading(false);
          }
          return Promise.resolve();
        }}
        rowCount={rowCount}
        threshold={2}
      >
        {(infiniteLoaderProps) => (
          <List
            onRowsRendered={infiniteLoaderProps.onRowsRendered}
            height={height}
            width={width}
            rowCount={rowCount}
            rowHeight={rowHeight}
            rowRenderer={rowWrapper}
            props={props}
            autoHeight={true}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            overscanRowCount={4}
            scrollTop={scrollTop}
          />
        )}
      </InfiniteLoader>
    </div>
  );
}

function VirtualizedGrid({ content, ...props }: VirtualizedGridProps) {
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>();
  const [isLoading, setIsLoading] = useState(false);

  const windowScrollerRef = useRef<WindowScroller>(null);
  const updatePosition = useDebounceCallback(() =>
    windowScrollerRef.current?.updatePosition()
  );
  const contentObserver = React.useRef(
    new ResizeObserver(() => {
      updatePosition();
    })
  );

  return (
    <RootContainer ref={setScrollElement}>
      {scrollElement && (
        <ContentContainer>
          {content && (
            <div ref={(el) => el && contentObserver.current.observe(el)}>
              {content}
            </div>
          )}
          <WindowScroller ref={windowScrollerRef} scrollElement={scrollElement}>
            {(windowScrollerProps) => (
              <AutoSizer disableHeight={true}>
                {({ width }) => (
                  <AutoSizedContainer
                    {...props}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    width={width}
                    windowScrollerProps={windowScrollerProps}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </ContentContainer>
      )}
    </RootContainer>
  );
}

export default VirtualizedGrid;
