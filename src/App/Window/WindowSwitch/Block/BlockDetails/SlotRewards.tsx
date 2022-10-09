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
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import SolBalance from '../../_sharedComponents/SolBalance/SolBalance';
import blockStateAtom from '../_atoms/blockStateAtom';

function SlotRewardsContent() {
  const blockState = useRecoilValue(blockStateAtom);

  if (!blockState) {
    return <div>Block not found</div>;
  }

  const {
    block: { rewards },
  } = blockState;

  const top10Rewards = rewards ? rewards.slice(0, 10) : [];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>New Balance</TableCell>
            <TableCell>Percent Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {top10Rewards.length === 0 ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan={5}>No data available</TableCell>
            </TableRow>
          ) : (
            top10Rewards.map((reward, idx) => {
              const { lamports, postBalance, pubkey, rewardType } = reward;

              let percentChange;
              if (reward.postBalance !== null && reward.postBalance !== 0) {
                percentChange = (
                  (Math.abs(reward.lamports) /
                    (reward.postBalance - reward.lamports)) *
                  100
                ).toFixed(9);
              }

              return (
                <TableRow
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <LabeledAddressLink to={pubkey} allowCopy={true} />
                  </TableCell>
                  <TableCell>
                    <pre>{rewardType}</pre>
                  </TableCell>
                  <TableCell>
                    <SolBalance lamports={lamports} />
                  </TableCell>
                  <TableCell>
                    {postBalance ? <SolBalance lamports={postBalance} /> : null}
                  </TableCell>
                  <TableCell>
                    <pre>{percentChange}%</pre>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SlotRewards() {
  return (
    <ExplorerAccordion
      id="slot-rewards"
      title="Slot Rewards"
      expanded={false}
      content={<SlotRewardsContent />}
    />
  );
}

export default SlotRewards;
