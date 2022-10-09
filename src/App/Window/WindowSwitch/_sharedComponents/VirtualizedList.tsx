import React, { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { List, ListProps } from 'react-virtualized';

function VirtualizedList(props: ListProps) {
  const listRef = useRef<List>(null);
  const scrollRef = useRef<Scrollbars>(null);

  return (
    <Scrollbars
      ref={scrollRef}
      autoHide={true}
      style={{
        height: props.height,
        width: props.width,
      }}
      onScrollFrame={({ scrollTop, scrollLeft }) =>
        listRef.current?.Grid?.handleScrollEvent({
          scrollTop,
          scrollLeft,
        })
      }
    >
      <List
        ref={listRef}
        style={{
          overflowX: '-moz-hidden-unscrollable',
          overflowY: '-moz-hidden-unscrollable',
        }}
        onScroll={({ scrollTop, scrollLeft }) => {
          // sync scrollbar positioning when props.scrollToIndex changes

          if (scrollTop !== scrollRef.current?.getScrollTop()) {
            scrollRef.current?.scrollTop(scrollTop);
          }

          if (scrollLeft !== scrollRef.current?.getScrollLeft()) {
            scrollRef.current?.scrollLeft(scrollTop);
          }
        }}
        {...props}
      />
    </Scrollbars>
  );
}

export default VirtualizedList;
