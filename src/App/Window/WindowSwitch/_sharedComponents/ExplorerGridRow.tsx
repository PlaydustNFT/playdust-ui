import { TableCell, TableRow } from '@mui/material';
import React from 'react';

type ExplorerGridRowProps = {
  label: number | string | JSX.Element;
  value: number | string | JSX.Element;
};

function ExplorerGridRow({ label, value }: ExplorerGridRowProps) {
  return (
    <TableRow>
      <TableCell sx={{ borderBottom: '1px solid white' }}>{label}</TableCell>
      <TableCell
        sx={{
          borderBottom: '1px solid white',
          whiteSpace: 'nowrap',
          textAlign: { sm: 'left', md: 'right' },
        }}
      >
        {value}
      </TableCell>
    </TableRow>
  );
}

export default ExplorerGridRow;
