import { Stack } from '@mui/material';
import {
  ParsedInnerInstruction,
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import parsedConfirmedTransactionAtom from '../_atoms/parsedConfirmedTransactionAtom';
import UnknownInstructionDetailsCard from './UnknownInstructionDetailsCard/UnknownInstructionDetailsCard';
import transactionStatusAtom from './_atoms/transactionStatusAtom';

function InstructionDetails() {
  const parsedConfirmedTransaction = useRecoilValue(
    parsedConfirmedTransactionAtom
  );

  const status = useRecoilValue(transactionStatusAtom);

  if (!parsedConfirmedTransaction || !status?.info) {
    return null;
  }

  const { transaction, meta } = parsedConfirmedTransaction;

  const {
    message: { instructions },
  } = transaction;

  if (transaction.message.instructions.length === 0) {
    return null;
  }

  const innerInstructions: {
    [index: number]: (ParsedInstruction | PartiallyDecodedInstruction)[];
  } = {};

  if (meta?.innerInstructions) {
    meta.innerInstructions.forEach((parsed: ParsedInnerInstruction) => {
      if (!innerInstructions[parsed.index]) {
        innerInstructions[parsed.index] = [];
      }

      parsed.instructions.forEach((ix) => {
        innerInstructions[parsed.index].push(ix);
      });
    });
  }

  const { result } = status.info;

  const content = instructions.map((instruction, idx) => {
    const innerCards: JSX.Element[] = [];

    if (idx in innerInstructions) {
      innerInstructions[idx].forEach((ix, childIndex) => {
        const key = `${idx}-${childIndex}`;

        const card = (
          <UnknownInstructionDetailsCard
            key={key}
            index={idx}
            ix={ix}
            result={result}
            tx={transaction}
            childIndex={childIndex}
          />
        );

        innerCards.push(card);
      });
    }

    const key = `${idx}`;

    return (
      <UnknownInstructionDetailsCard
        key={key}
        index={idx}
        ix={instruction}
        result={result}
        tx={transaction}
        innerCards={innerCards}
      />
    );
  });

  return (
    <ExplorerAccordion
      id="instruction-details"
      title="Instruction Details"
      expanded={true}
      content={<Stack spacing={2}>{content}</Stack>}
    />
  );
}

export default InstructionDetails;
