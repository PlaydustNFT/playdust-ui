import {
  AccountMeta,
  ParsedInstruction,
  ParsedTransaction,
  PartiallyDecodedInstruction,
  TransactionInstruction,
} from '@solana/web3.js';
import bs58 from 'bs58';
import React from 'react';
import { useRecoilValue } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import safePubkeyString from '../../../../../_helpers/safePubkeyString';
import programLabel from '../../../_helpers/programLabel';
import BasicInstructionCard from './BasicInstructionCard/BasicInstructionCard';
import InstructionCardPropsType from './_types/InstructionCardPropsType';

function intoTransactionInstruction(
  tx: ParsedTransaction,
  instruction: ParsedInstruction | PartiallyDecodedInstruction
): TransactionInstruction | undefined {
  const { message } = tx;
  if ('parsed' in instruction) return;

  const keys: Array<AccountMeta> = [];

  // We are using find in place of forEach, return true is used to break out of array iteration
  instruction.accounts.find((account) => {
    const accountKey = message.accountKeys.find(({ pubkey }) =>
      pubkey.equals(account)
    );
    if (!accountKey) return true;
    keys.push({
      pubkey: accountKey.pubkey,
      isSigner: accountKey.signer,
      isWritable: accountKey.writable,
    });
    return false;
  });

  // We need a key for each account
  if (instruction.accounts.length !== keys.length) {
    return;
  }

  return new TransactionInstruction({
    data: bs58.decode(instruction.data),
    keys,
    programId: instruction.programId,
  });
}

function UnknownInstructionDetailsCard(props: InstructionCardPropsType) {
  const { tx, ix } = props;

  const { network } = useRecoilValue(solanaClusterAtom);

  const programId = safePubkeyString(ix.programId);
  const programName = programLabel(programId, network) || 'Unknown Program';

  const title = `${programName}: Unknown Instruction`;

  const txix = 'parsed' in ix ? ix : intoTransactionInstruction(tx, ix);

  const newProps = {
    ...props,
    ix: txix,
  };

  return <BasicInstructionCard {...newProps} title={title} />;
}

export default UnknownInstructionDetailsCard;
