import styled from '@emotion/styled';
import { Box, Link, Skeleton, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { AutoSizer, InfiniteLoader, ListRowRenderer } from 'react-virtualized';
import { useRecoilValueLoadable } from 'recoil';
import ImageButton from '../../../../_sharedComponents/ImageButton';
import humanizeCollection from '../../_helpers/humanizeCollection';
import humanizeSolana from '../../_helpers/humanizeSolana';
import useAddCollectionQueryNode from '../../_hooks/useAddCollectionQueryNode';
import VirtualizedList from '../../_sharedComponents/VirtualizedList';
import topCollectionsAtom from './_atoms/topCollectionsAtom';
import useFetchMoreTopCollections from './_hooks/useFetchMoreTopCollections';

const rowHeight = 65;

const RootContainer = styled.div`
  height: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const GroupContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: ${rowHeight}px;
`;

function TopCollections() {
  const fetchMore = useFetchMoreTopCollections();
  const topCollectionsLoadable = useRecoilValueLoadable(topCollectionsAtom);
  const addCollectionQuery = useAddCollectionQueryNode('href');
  const hasValue = topCollectionsLoadable.state === 'hasValue';

  const grouped = useMemo(() => {
    if (hasValue) {
      const { results } = topCollectionsLoadable.contents;

      return results.map(({ collection, nfts }) => ({
        key: collection.id,
        groupLabel: humanizeCollection(collection),
        groupSecondary: humanizeSolana(collection.volume.global.total, 2),
        groupHref: addCollectionQuery(collection.id),
        groupTotal: collection.elementCount,
        nfts,
      }));
    }

    return [];
  }, [hasValue, addCollectionQuery, topCollectionsLoadable.contents]);

  const rowRenderer = useCallback<ListRowRenderer>(
    ({ key, index, style }) => {
      if (!grouped[index]) {
        return (
          <div key={key} style={style}>
            <GroupContainer>
              <Skeleton
                height={40}
                width={40}
                variant="circular"
                animation="wave"
              />
              <Skeleton
                sx={{ margin: '0 0 0 8px' }}
                height={25}
                width={200}
                variant="rectangular"
                animation="wave"
              />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton
                height={25}
                width={75}
                variant="rectangular"
                animation="wave"
              />
            </GroupContainer>
          </div>
        );
      }

      const { groupHref, groupLabel, groupSecondary, nfts } = grouped[index];

      return (
        <div key={key} style={style}>
          <GroupContainer
            sx={{
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            <Link href={groupHref}>
              <ImageButton size={40} images={nfts.map((nft) => nft.image)} />
            </Link>
            <Link
              sx={{ margin: '0 0 0 8px', textAlign: 'left' }}
              href={groupHref}
            >
              {groupLabel}
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {groupSecondary}
          </GroupContainer>
        </div>
      );
    },
    [grouped]
  );

  const [isLoading, setIsLoading] = useState(false);

  const rowCount = grouped.length || 25;
  const totalRows = hasValue ? topCollectionsLoadable.contents.total : 25;

  return (
    <RootContainer>
      <GroupContainer>
        <Typography variant="subtitle2">TOP COLLECTIONS</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="subtitle2">VOLUME</Typography>
      </GroupContainer>
      <InfiniteLoader
        isRowLoaded={({ index }) => !!grouped[index] || !hasValue}
        loadMoreRows={async () => {
          if (!isLoading) {
            setIsLoading(true);
            await fetchMore();
            setIsLoading(false);
          }
          return Promise.resolve();
        }}
        rowCount={totalRows}
        threshold={2}
      >
        {({ onRowsRendered }) => (
          <AutoSizer>
            {({ height, width }) => (
              <VirtualizedList
                height={height - rowHeight}
                onRowsRendered={onRowsRendered}
                rowCount={rowCount}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </RootContainer>
  );
}

export default TopCollections;
