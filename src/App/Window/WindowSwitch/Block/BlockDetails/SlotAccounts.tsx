import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import blockStateAtom from '../_atoms/blockStateAtom';

type AccountStats = {
  reads: number;
  writes: number;
};

function SlotAccountsContent() {
  const blockState = useRecoilValue(blockStateAtom);

  const accountStats = useMemo(() => {
    if (!blockState) {
      return [];
    }

    const { block } = blockState;

    const statsMap = new Map<string, AccountStats>();

    block.transactions.forEach((tx) => {
      const { message } = tx.transaction;

      const txSet = new Map<string, boolean>();

      message.instructions.forEach((ix) => {
        ix.accounts.forEach((index) => {
          let address;
          try {
            address = message.accountKeys[index].toBase58();
          } catch (err) {
            address = '???';
          }
          txSet.set(address, message.isAccountWritable(index));
        });
      });

      txSet.forEach((isWritable, address) => {
        const stats = statsMap.get(address) || { reads: 0, writes: 0 };
        if (isWritable) {
          stats.writes += 1;
        } else {
          stats.reads += 1;
        }
        statsMap.set(address, stats);
      });
    });

    const accountEntries: [string, AccountStats][] = [];
    statsMap.forEach((value, key) => {
      accountEntries.push([key, value]);
    });

    accountEntries.sort((a, b) => {
      const aCount = a[1].reads + a[1].writes;
      const bCount = b[1].reads + b[1].writes;
      if (aCount < bCount) return 1;
      if (aCount > bCount) return -1;
      return 0;
    });

    return accountEntries;
  }, [blockState]);

  if (!blockState) {
    return <div>Block not found</div>;
  }

  const { block } = blockState;

  const totalTransactions = block.transactions.length;

  const tableRows = accountStats
    .slice(0, 25)
    .map(([address, { writes, reads }]) => (
      <TableRow
        key={address}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <LabeledAddressLink to={address} allowCopy={true} />
        </TableCell>
        <TableCell>
          <pre>{writes}</pre>
        </TableCell>
        <TableCell>
          <pre>{reads}</pre>
        </TableCell>
        <TableCell>
          <pre>{writes + reads}</pre>
        </TableCell>
        <TableCell>
          <pre>{`${((100 * (writes + reads)) / totalTransactions).toFixed(
            2
          )}%`}</pre>
        </TableCell>
      </TableRow>
    ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Read-Write Count</TableCell>
            <TableCell>Read-Only Count</TableCell>
            <TableCell>Total Count</TableCell>
            <TableCell>% of Transactions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

function SlotAccounts() {
  return (
    <ExplorerAccordion
      id="slot-accounts"
      title="Slot Accounts"
      expanded={false}
      content={<SlotAccountsContent />}
    />
  );
}

export default SlotAccounts;
