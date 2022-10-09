import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ParsedInstruction,
  SignatureResult,
  TransactionInstruction,
} from '@solana/web3.js';
import React, { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import LabeledAddressLink from '../../../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import TransactionErrorDetailsType from '../../../_types/TransactionErrorDetailsType';
import InstructionCardPropsType from '../_types/InstructionCardPropsType';
import RawDetails from './RawDetails/RawDetails';
import RawParsedDetails from './RawParsedDetails';
import rawPopulatedTransactionAtom from './_atoms/rawPopulatedTransactionAtom';

function ixResult(
  result: SignatureResult,
  index: number
): ['warning' | 'error' | 'success', string?] {
  if (!result.err) {
    return ['success'];
  }

  if (typeof result.err === 'object' && 'InstructionError' in result.err) {
    const ixError = (result.err as TransactionErrorDetailsType)
      .InstructionError;
    if (ixError && Array.isArray(ixError)) {
      const [errorIndex, error] = ixError;
      if (Number.isInteger(errorIndex) && errorIndex === index) {
        return ['warning', `Error: ${JSON.stringify(error)}`];
      }
    }
  }

  return ['error'];
}

type BasicInstructionCardProps = Omit<InstructionCardPropsType, 'ix'> & {
  ix: ParsedInstruction | TransactionInstruction | undefined;
  title: string;
};

function BasicInstructionCard(
  props: PropsWithChildren<BasicInstructionCardProps>
) {
  const { title, ix, result, index, innerCards, childIndex } = props;

  const rawPopulatedTransaction = useRecoilValue(rawPopulatedTransactionAtom);

  const [resultColor] = ixResult(result, index);

  const raw =
    rawPopulatedTransaction && childIndex === undefined
      ? rawPopulatedTransaction.transaction.instructions[index]
      : undefined;

  const label = `#${index + 1}${
    childIndex !== undefined ? `.${childIndex + 1}` : ''
  }`;

  if (!ix) {
    return null;
  }

  let rawDetails;

  if ('parsed' in ix) {
    rawDetails = (
      <RawParsedDetails ix={ix}>
        {raw ? <RawDetails ix={raw} /> : null}
      </RawParsedDetails>
    );
  } else {
    rawDetails = <RawDetails ix={ix} />;
  }

  return (
    <Box>
      <Typography variant="h6">
        <Chip label={label} color={resultColor} size="small" /> {title}
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <>
              <TableRow>
                <TableCell>Program</TableCell>
                <TableCell>
                  <LabeledAddressLink to={ix.programId} allowCopy={true} />
                </TableCell>
              </TableRow>
              {rawDetails}
            </>
            {innerCards && innerCards.length > 0 && (
              <TableRow>
                <TableCell colSpan={2}>
                  Inner Instructions
                  <Box p={3}>{innerCards}</Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BasicInstructionCard;
