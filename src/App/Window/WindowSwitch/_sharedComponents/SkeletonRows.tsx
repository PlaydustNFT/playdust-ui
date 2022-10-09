import { Button, Skeleton } from '@mui/material';
import React from 'react';

interface SkeletonRowsProps {
  rows?: number;
}

function SkeletonRows({ rows = 10 }: SkeletonRowsProps) {
  return (
    <>
      {[...Array(rows).keys()].map((entry) => (
        <Button key={`skeleton-${entry}`}>
          <Skeleton sx={{ width: '100%' }} />
        </Button>
      ))}
    </>
  );
}

export default SkeletonRows;
