import { Pagination } from '@mui/material';
import React, { useState } from 'react';

function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

type PaginatedListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderContainer: (children: React.ReactNode) => React.ReactNode;
  itemsPerPage?: number;
};

function PaginatedList<T>({
  items,
  itemsPerPage = 10,
  renderItem,
  renderContainer,
}: PaginatedListProps<T>) {
  const [page, updatePage] = useState(1);
  const chunks = chunk(items, itemsPerPage);

  if (chunks.length <= 0) {
    return null;
  }

  return (
    <>
      <Pagination
        count={chunks.length}
        page={page}
        onChange={(e, newPage) => updatePage(newPage)}
        disabled={chunks.length === 1}
      />
      {renderContainer(chunks[page - 1].map(renderItem))}
      <Pagination
        count={chunks.length}
        page={page}
        onChange={(e, newPage) => updatePage(newPage)}
        disabled={chunks.length === 1}
      />
    </>
  );
}

export default PaginatedList;
