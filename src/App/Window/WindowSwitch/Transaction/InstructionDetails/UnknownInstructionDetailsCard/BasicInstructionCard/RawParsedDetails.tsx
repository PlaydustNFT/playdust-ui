import { TableCell, TableRow } from '@mui/material';
import { ParsedInstruction } from '@solana/web3.js';
import React from 'react';

function RawParsedDetails({
  ix,
  children,
}: {
  ix: ParsedInstruction;
  children?: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TableRow>
        <TableCell>
          Instruction Data <span className="text-muted">(JSON)</span>
        </TableCell>
        <TableCell className="text-lg-end">
          <pre className="d-inline-block text-start json-wrap">
            {JSON.stringify(ix.parsed, null, 2)}
          </pre>
        </TableCell>
      </TableRow>
    </>
  );
}

export default RawParsedDetails;
