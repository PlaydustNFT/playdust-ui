import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ConfirmedTransactionMeta,
  TransactionSignature,
} from '@solana/web3.js';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import blockStateAtom from '../_atoms/blockStateAtom';

type TransactionWithInvocations = {
  index: number;
  signature?: TransactionSignature;
  meta: ConfirmedTransactionMeta | null;
  invocations: Map<string, number>;
};

function SlotTransactionsContent() {
  const blockState = useRecoilValue(blockStateAtom);

  const { transactions } = useMemo(() => {
    if (!blockState) {
      return {};
    }

    const { block } = blockState;

    const invokedProgramsMap = new Map<string, number>();

    const transactionsWithInvocations: TransactionWithInvocations[] =
      block.transactions.map((tx, index) => {
        let signature: TransactionSignature | undefined;
        if (tx.transaction.signatures.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          signature = tx.transaction.signatures[0];
        }

        const programIndexes = tx.transaction.message.instructions.map(
          (ix) => ix.programIdIndex
        );
        programIndexes.concat(
          tx.meta?.innerInstructions?.flatMap((ix) =>
            ix.instructions.map((innerIx) => innerIx.programIdIndex)
          ) || []
        );

        const indexMap = new Map<number, number>();
        programIndexes.forEach((programIndex) => {
          const count = indexMap.get(programIndex) || 0;
          indexMap.set(programIndex, count + 1);
        });

        const invocations = new Map<string, number>();
        indexMap.forEach((count, i) => {
          const programId = safePubkeyString(
            tx.transaction.message.accountKeys[i]
          );
          invocations.set(programId, count);
          const programTransactionCount =
            invokedProgramsMap.get(programId) || 0;
          invokedProgramsMap.set(programId, programTransactionCount + 1);
        });

        return {
          index,
          signature,
          meta: tx.meta,
          invocations,
        };
      });
    return {
      transactions: transactionsWithInvocations,
      invokedPrograms: invokedProgramsMap,
    };
  }, [blockState]);

  if (!blockState) {
    return <div>Block not found</div>;
  }

  if (!transactions) {
    return <div>No transactions found</div>;
  }

  const top10Transactions = transactions.filter((tx) => !!tx).slice(0, 10);

  const tableRows = top10Transactions.map((transaction, idx) => {
    const { meta, signature: txSignature } = transaction || {};

    const { err } = meta || {};

    const result = err ? (
      <Chip color="error" label="Error" />
    ) : (
      <Chip color="success" label="Sucess" />
    );

    const signature = txSignature ? (
      <ExplorerLink
        type="tx"
        to={txSignature}
        ellipsis={{ cutoff: 30, remain: 0 }}
      />
    ) : null;

    const entries = [...transaction.invocations.entries()];
    entries.sort();

    const instructions =
      transaction.invocations.size === 0
        ? 'NA'
        : entries.map(([programId, count], i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>
              <LabeledAddressLink to={programId} allowCopy={true} />
              <span>{` (${count})`}</span>
            </div>
          ));

    return (
      <TableRow
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {result}
        </TableCell>
        <TableCell>{signature}</TableCell>
        <TableCell>{instructions}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Result</TableCell>
            <TableCell>Transaction Signature</TableCell>
            <TableCell>Invoked Programs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

function SlotTransactions() {
  return (
    <ExplorerAccordion
      id="slot-transactions"
      title="Slot Transactions"
      expanded={false}
      content={<SlotTransactionsContent />}
    />
  );
}

export default SlotTransactions;
