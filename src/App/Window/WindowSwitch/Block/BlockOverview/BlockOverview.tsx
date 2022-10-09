import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import blockStateAtom from '../_atoms/blockStateAtom';
import clusterInfoAtom from './_atoms/clusterInfoAtom';

function BlockOverview() {
  const blockState = useRecoilValue(blockStateAtom);
  const clusterInfo = useRecoilValue(clusterInfoAtom);

  if (!blockState) {
    return <div>Block not found</div>;
  }

  const { slot, block, childSlot, blockLeader, childLeader, parentLeader } =
    blockState;

  const { epochSchedule } = clusterInfo;

  const epoch = epochSchedule.getEpoch(slot);

  const { blockTime, blockhash, parentSlot, previousBlockhash, transactions } =
    block;

  const localBlockTime = blockTime
    ? DateTime.fromMillis(blockTime * 1000).toLocaleString(
        DateTime.DATETIME_FULL
      )
    : 'Unavailable';
  const utcBlockTime = blockTime
    ? DateTime.fromMillis(blockTime * 1000).toLocaleString(
        DateTime.DATETIME_FULL
      )
    : 'Unavailable';

  return (
    <ExplorerAccordion
      id="block-overview"
      title="Block Overview"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow label="Block Hash" value={<pre>{blockhash}</pre>} />

          <ExplorerGridRow label="Slot" value={parentSlot + 1} />

          {blockLeader !== undefined && (
            <ExplorerGridRow
              label="Slot Leader"
              value={
                <ExplorerLink type="block" to={blockLeader} allowCopy={true} />
              }
            />
          )}

          <ExplorerGridRow
            label="Timestamp (Local)"
            value={<pre>{localBlockTime}</pre>}
          />

          <ExplorerGridRow
            label="Timestamp (UTC)"
            value={<pre>{utcBlockTime}</pre>}
          />

          <ExplorerGridRow
            label="Epoch"
            value={<ExplorerLink type="epoch" to={epoch} allowCopy={true} />}
          />

          <ExplorerGridRow
            label="Parent Blockhash"
            value={<pre>{previousBlockhash}</pre>}
          />

          <ExplorerGridRow
            label="Parent Slot"
            value={
              <ExplorerLink type="block" to={parentSlot} allowCopy={true} />
            }
          />

          {parentLeader !== undefined && (
            <ExplorerGridRow
              label="Parent Slot Leader"
              value={
                <ExplorerLink type="block" to={parentLeader} allowCopy={true} />
              }
            />
          )}

          {childSlot !== undefined && (
            <ExplorerGridRow
              label="Child Slot"
              value={
                <ExplorerLink type="block" to={childSlot} allowCopy={true} />
              }
            />
          )}

          {childLeader !== undefined && (
            <ExplorerGridRow
              label="Child Slot Leader"
              value={
                <ExplorerLink type="block" to={childLeader} allowCopy={true} />
              }
            />
          )}

          <ExplorerGridRow
            label="Processed Transactions"
            value={transactions.length}
          />

          <ExplorerGridRow
            label="Successful Transactions"
            value={transactions.length}
          />
        </ExplorerGrid>
      }
    />
  );
}

export default BlockOverview;
