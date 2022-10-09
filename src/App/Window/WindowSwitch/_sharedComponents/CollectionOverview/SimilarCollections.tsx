import styled from '@emotion/styled';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TypographyProps,
} from '@mui/material';
import { lighten, useTheme } from '@mui/material/styles';
import React, { ReactNode, useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import humanizeCollection from '../../_helpers/humanizeCollection';
import humanizeSolana from '../../_helpers/humanizeSolana';
import useAddCollectionQueryNode from '../../_hooks/useAddCollectionQueryNode';
import CollectionOverviewResponseType from '../../_types/CollectionOverviewResponseType';
import OpenSearchCollectionSourceType from '../../_types/OpenSearchCollectionSourceType';

const VerticalTrack = styled.div`
  position: absolute;
  width: 6px;
  right: 2px;
  bottom: 2px;
  top: 37px;
  border-radius: 3px;
`;

type Column = {
  label: string;
  getValue: (data: OpenSearchCollectionSourceType) => ReactNode;
};

const columns: Column[] = [
  {
    label: 'Collection',
    getValue: humanizeCollection,
  },
  {
    label: 'Total Volume',
    getValue: ({ volume }) => humanizeSolana(volume.global.total, 2),
  },
  {
    label: 'Floor Price',
    getValue: ({ floorPrice }) => humanizeSolana(floorPrice.global, 2),
  },
  {
    label: 'Items',
    getValue: ({ elementCount }) => elementCount.toLocaleString(),
  },
];

function SimilarCollections({
  overview,
}: {
  overview: CollectionOverviewResponseType;
}) {
  const theme = useTheme();
  const addCollectionQueryNode = useAddCollectionQueryNode();
  const filtered = useMemo(() => {
    if (!overview) {
      return [];
    }

    return overview.similar.filter((entry) => {
      const noName = !entry.name || entry.name === '';
      const noSymbol = !entry.symbol || entry.symbol === '';

      return !(noName && noSymbol);
    });
  }, [overview]);

  const overviewColor = useMemo(() => {
    const { similar, ...current } = overview;

    if (!current.volume.global.total) {
      return theme.palette.error;
    }

    const highestVolume = Math.max(
      ...[
        current.volume.global.total,
        ...similar.map((s) => s.volume.global.total),
      ]
    );

    if (current.volume.global.total === highestVolume) {
      return theme.palette.success;
    }

    return theme.palette.warning;
  }, [overview, theme]);

  return (
    overview && (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', maxHeight: '300px' }}
      >
        <Typography sx={{ p: '8px 16px', backgroundColor: '#F6F6F6' }}>
          Similar NFT Collections found
        </Typography>
        <Scrollbars
          autoHide={true}
          autoHeight={true}
          renderTrackVertical={() => <VerticalTrack />}
        >
          <Table
            stickyHeader={true}
            size="small"
            sx={{
              backgroundColor: 'white',
            }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    sx={{
                      color: '#45575C',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[overview, ...filtered].map((entry) => {
                const isOverview = entry === overview;

                const fontProps: TypographyProps = {
                  fontSize: '0.8rem',
                  ...(isOverview && {
                    fontWeight: 'bold',
                    color: overviewColor.main,
                  }),
                };
                return (
                  <TableRow
                    key={entry.id}
                    sx={{
                      ...(isOverview && {
                        backgroundColor: lighten(overviewColor.main, 0.9),
                      }),
                    }}
                    hover={!isOverview}
                    onClick={() => addCollectionQueryNode(entry.id, true)}
                    {...(isOverview && { onClick: undefined })}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.label}
                        scope="row"
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        <Typography {...fontProps}>
                          {column.getValue(entry)}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbars>
      </Box>
    )
  );
}

export default SimilarCollections;
