import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';
import PaginatedList from './_sharedComponents/PaginatedList';

// SysvarRecentB1ockHashes11111111111111111111
function SysvarAccountRecentBlockhashesCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (
    !parsedSysvarAccount ||
    parsedSysvarAccount.type !== 'recentBlockhashes'
  ) {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarRecentBlockhashes"
      title="Sysvar: Recent Blockhashes"
      expanded={true}
      content={
        <PaginatedList
          items={info}
          itemsPerPage={10}
          renderContainer={(children) => (
            <Table sx={{ paddingBottom: '24px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Blockhash</TableCell>
                  <TableCell>Lamports Per Signature</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{children}</TableBody>
            </Table>
          )}
          renderItem={(item) => (
            <TableRow>
              <TableCell>{item.blockhash}</TableCell>
              <TableCell>{item.feeCalculator.lamportsPerSignature}</TableCell>
            </TableRow>
          )}
        />
      }
    />
  );
}

export default SysvarAccountRecentBlockhashesCard;
