import { Chip, TableCell, TableRow } from '@mui/material';
import { TransactionInstruction } from '@solana/web3.js';
import React from 'react';
import safePubkeyString from '../../../../../../../_helpers/safePubkeyString';
import LabeledAddressLink from '../../../../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import HexData from './HexData';

function RawDetails({ ix }: { ix: TransactionInstruction }) {
  return (
    <>
      {ix.keys.map(({ pubkey, isSigner, isWritable }, idx) => {
        const safePubkey = safePubkeyString(pubkey);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={idx}>
            <TableCell>
              <span>Account #{idx + 1} </span>
              {isWritable && <Chip label="Writable" size="small" />}
              {isSigner && <Chip label="Signer" size="small" />}
            </TableCell>
            <TableCell>
              <LabeledAddressLink to={safePubkey} allowCopy={true} />
            </TableCell>
          </TableRow>
        );
      })}

      <TableRow>
        <TableCell>Instruction Data (Hex)</TableCell>
        <TableCell>
          <HexData raw={ix.data} />
        </TableCell>
      </TableRow>
    </>
  );
}

export default RawDetails;
