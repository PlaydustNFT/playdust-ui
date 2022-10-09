import { Chip, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Message, ParsedMessage, PublicKey } from '@solana/web3.js';
import React from 'react';
import { useRecoilValue } from 'recoil';
import solanaClusterAtom from '../../../../_atoms/solanaClusterAtom';
import programLabel from '../../_helpers/programLabel';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import rawTransactionAtom from '../_atoms/rawTransactionAtom';
import prettyProgramLogs from './_helpers/prettyProgramLogs';
import InstructionLogsType from './_types/InstructionLogsType';

interface ProgramNameProps {
  programId: PublicKey;
}

function ProgramName({ programId }: ProgramNameProps) {
  const { network } = useRecoilValue(solanaClusterAtom);

  const programName =
    programLabel(programId.toBase58(), network) || 'Unknown Program';

  return <span>{programName}</span>;
}

interface ProgramLogsCardProps {
  message: Message | ParsedMessage;
  logs: InstructionLogsType[];
}

function ProgramLogsCard({ message, logs }: ProgramLogsCardProps) {
  return (
    <Table>
      <TableBody>
        {message.instructions.map((ix, ixIdx) => {
          let programId;
          if ('programIdIndex' in ix) {
            const programAccount = message.accountKeys[ix.programIdIndex];
            if ('pubkey' in programAccount) {
              programId = programAccount.pubkey;
            } else {
              programId = programAccount;
            }
          } else {
            programId = ix.programId;
          }
          const programLogs: InstructionLogsType | undefined = logs[ixIdx];

          let badgeColor: 'warning' | 'success' | undefined;
          if (programLogs) {
            badgeColor = programLogs.failed ? 'warning' : 'success';
          }

          return (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={ixIdx}>
              <TableCell>
                <div>
                  <Chip
                    label={`#${ixIdx + 1}`}
                    color={badgeColor}
                    size="small"
                  />{' '}
                  <ProgramName programId={programId} /> Instruction
                </div>
                {programLogs && (
                  <div>
                    {programLogs.logs.map((log, logIdx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={logIdx}>
                        <span className="text-muted">{log.prefix}</span>
                        <span className={`text-${log.style}`}>{log.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function ProgramLog() {
  const { network } = useRecoilValue(solanaClusterAtom);
  const tx = useRecoilValue(rawTransactionAtom);

  if (!tx) {
    return null;
  }

  const {
    meta,
    transaction: { message },
  } = tx;

  const { logMessages, err } = meta || {};

  const prettyLogs = prettyProgramLogs(logMessages || [], err || null, network);

  if (!prettyLogs) {
    return null;
  }

  return (
    <ExplorerAccordion
      id="program-log"
      title="Program Log"
      expanded={true}
      content={<ProgramLogsCard message={message} logs={prettyLogs} />}
    />
  );
}

export default ProgramLog;
