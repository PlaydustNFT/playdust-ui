import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ParsedMessageAccount } from '@solana/web3.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import SolBalance from '../_sharedComponents/SolBalance/SolBalance';
import parsedConfirmedTransactionAtom from './_atoms/parsedConfirmedTransactionAtom';

function AccountInputs() {
  const parsedConfirmedTransaction = useRecoilValue(
    parsedConfirmedTransactionAtom
  );

  if (!parsedConfirmedTransaction) {
    return null;
  }

  const {
    meta,
    transaction: { message },
  } = parsedConfirmedTransaction;

  const { postBalances, preBalances } = meta || {};

  if (!message.accountKeys) {
    return null;
  }

  return (
    <ExplorerAccordion
      id="account-inputs"
      title="Account Inputs"
      expanded={true}
      content={
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Pre Balance (SOL)</TableCell>
                <TableCell>Post Balance (SOL)</TableCell>
                <TableCell>Change (SOL)</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {message.accountKeys.map(
                (account: ParsedMessageAccount, idx: number) => {
                  const { pubkey } = account;

                  const preBalance = preBalances?.[idx] ?? 0;
                  const postBalance = postBalances?.[idx] ?? 0;

                  return (
                    <TableRow
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <LabeledAddressLink to={pubkey} allowCopy={true} />
                      </TableCell>
                      <TableCell>
                        <SolBalance lamports={preBalance} />
                      </TableCell>
                      <TableCell>
                        <SolBalance lamports={postBalance} />
                      </TableCell>
                      <TableCell>
                        <SolBalance lamports={preBalance - postBalance} />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {idx === 0 && (
                            <Chip color="info" label="Fee Payer" size="small" />
                          )}
                          {account.writable && (
                            <Chip color="info" label="Writable" size="small" />
                          )}
                          {account.signer && (
                            <Chip color="info" label="Signer" size="small" />
                          )}
                          {message.instructions.find((ix) =>
                            ix.programId.equals(pubkey)
                          ) && (
                            <Chip color="info" label="Program" size="small" />
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      }
    />
  );
}

export default AccountInputs;
