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
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import parsedSysvarAccountAtom from './_atoms/parsedSysvarAccountAtom';
import PaginatedList from './_sharedComponents/PaginatedList';

// SysvarStakeHistory1111111111111111111111111
function SysvarAccountStakeHistoryCard() {
  const parsedSysvarAccount = useRecoilValue(parsedSysvarAccountAtom);

  if (!parsedSysvarAccount || parsedSysvarAccount.type !== 'stakeHistory') {
    return null;
  }

  const { info } = parsedSysvarAccount;

  return (
    <ExplorerAccordion
      id="sysvarStakeHistory"
      title="Sysvar: Stake History"
      expanded={true}
      content={
        <PaginatedList
          items={info}
          itemsPerPage={10}
          renderContainer={(children) => (
            <Table sx={{ paddingBottom: '24px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Epoch</TableCell>
                  <TableCell>Activating</TableCell>
                  <TableCell>Deactivating</TableCell>
                  <TableCell>Effective</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{children}</TableBody>
            </Table>
          )}
          renderItem={({
            epoch,
            stakeHistory: { activating, deactivating, effective },
          }) => (
            <TableRow>
              <TableCell>
                <ExplorerLink type="epoch" to={epoch} allowCopy={true} />
              </TableCell>
              <TableCell>{activating}</TableCell>
              <TableCell>{deactivating}</TableCell>
              <TableCell>{effective}</TableCell>
            </TableRow>
          )}
        />
      }
    />
  );
}

export default SysvarAccountStakeHistoryCard;
