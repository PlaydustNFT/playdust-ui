import { Table, TableBody, TableContainer } from '@mui/material';
import React, { ReactNode } from 'react';

function ExplorerGrid({ children }: { children: ReactNode | undefined }) {
  return (
    <TableContainer>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExplorerGrid;
