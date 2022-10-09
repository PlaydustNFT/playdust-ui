import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import blockStateAtom from '../_atoms/blockStateAtom';

function SlotProgramsContent() {
  const blockState = useRecoilValue(blockStateAtom);

  if (!blockState) {
    return <div>Block not found</div>;
  }

  const { block } = blockState;

  const totalTransactions = block.transactions.length;
  const txSuccesses = new Map<string, number>();
  const txFrequency = new Map<string, number>();
  const ixFrequency = new Map<string, number>();

  let totalInstructions = 0;
  block.transactions.forEach((tx) => {
    const { message } = tx.transaction;
    totalInstructions += message.instructions.length;
    const programUsed = new Set<string>();

    const trackProgram = (index: number) => {
      if (index >= message.accountKeys.length) return;
      const programId = message.accountKeys[index];
      const programAddress = safePubkeyString(programId);
      programUsed.add(programAddress);
      const frequency = ixFrequency.get(programAddress);
      ixFrequency.set(programAddress, frequency ? frequency + 1 : 1);
    };

    message.instructions.forEach((ix) => trackProgram(ix.programIdIndex));
    tx.meta?.innerInstructions?.forEach((inner) => {
      totalInstructions += inner.instructions.length;
      inner.instructions.forEach((innerIx) =>
        trackProgram(innerIx.programIdIndex)
      );
    });

    const successful = tx.meta?.err === null;
    programUsed.forEach((programId) => {
      const frequency = txFrequency.get(programId);
      txFrequency.set(programId, frequency ? frequency + 1 : 1);
      if (successful) {
        const count = txSuccesses.get(programId);
        txSuccesses.set(programId, count ? count + 1 : 1);
      }
    });
  });

  const programEntries: [string, number][] = [];
  txFrequency.forEach((value, key) => {
    programEntries.push([key, value]);
  });

  programEntries.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });

  const tableRows = programEntries.map(([programId, txFreq], idx) => {
    const ixFreq = ixFrequency.get(programId) as number;
    const successes = txSuccesses.get(programId) || 0;

    return (
      <TableRow
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <LabeledAddressLink to={programId} allowCopy={true} />
        </TableCell>
        <TableCell>{txFreq}</TableCell>
        <TableCell>{((100 * txFreq) / totalTransactions).toFixed(2)}</TableCell>
        <TableCell>{ixFreq}</TableCell>
        <TableCell>{((100 * ixFreq) / totalInstructions).toFixed(2)}</TableCell>
        <TableCell>{((100 * successes) / txFreq).toFixed(0)}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Program</TableCell>
            <TableCell>Transaction Count</TableCell>
            <TableCell># of Total</TableCell>
            <TableCell>Instruction Count</TableCell>
            <TableCell>% of Total</TableCell>
            <TableCell>Success Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

function SlotPrograms() {
  return (
    <ExplorerAccordion
      id="slot-programs"
      title="Slot Programs"
      expanded={false}
      content={<SlotProgramsContent />}
    />
  );
}
export default SlotPrograms;
