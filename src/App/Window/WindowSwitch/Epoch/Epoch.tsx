import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ContentContainer from '../_sharedComponents/ContentContainer';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../_sharedComponents/ExplorerLink/ExplorerLink';
import StandardWindowContainer from '../_sharedComponents/StandardWindowContainer';
import epochStateAtom from './_atoms/epochStateAtom';

const toLocaleString = (time: number) =>
  DateTime.fromMillis(time * 1000).toLocaleString(DateTime.DATETIME_FULL);

function Epoch() {
  const epochDetails = useRecoilValue(epochStateAtom);

  if (!epochDetails) {
    return <div>Epoch not found</div>;
  }

  const {
    epoch,
    currentEpoch,
    firstSlot,
    lastSlot,
    firstBlock,
    lastBlock,
    firstTimestamp,
    lastTimestamp,
  } = epochDetails;

  return (
    <StandardWindowContainer>
      <ContentContainer>
        <ExplorerAccordion
          id="epoch-overview"
          title="Epoch Overview"
          expanded={true}
          content={
            <ExplorerGrid>
              <ExplorerGridRow
                label="Epoch"
                value={
                  <ExplorerLink type="epoch" to={epoch} allowCopy={true} />
                }
              />

              {epoch > 0 && (
                <ExplorerGridRow
                  label="Previous Epoch"
                  value={
                    <ExplorerLink
                      type="epoch"
                      to={epoch - 1}
                      allowCopy={true}
                    />
                  }
                />
              )}

              <ExplorerGridRow
                label="Next Epoch"
                value={
                  currentEpoch > epoch ? (
                    <ExplorerLink
                      type="epoch"
                      to={epoch + 1}
                      allowCopy={true}
                    />
                  ) : (
                    <span>Epoch in progress</span>
                  )
                }
              />

              <ExplorerGridRow
                label="First Slot"
                value={
                  <ExplorerLink type="block" to={firstSlot} allowCopy={true} />
                }
              />

              <ExplorerGridRow
                label="Last Slot"
                value={
                  <ExplorerLink type="block" to={lastSlot} allowCopy={true} />
                }
              />

              {firstTimestamp && (
                <ExplorerGridRow
                  label="First Block Timestamp"
                  value={toLocaleString(firstTimestamp)}
                />
              )}

              <ExplorerGridRow
                label="First Block"
                value={
                  <ExplorerLink type="block" to={firstBlock} allowCopy={true} />
                }
              />

              <ExplorerGridRow
                label="Last Block"
                value={
                  lastBlock !== undefined ? (
                    <ExplorerLink type="block" to={lastBlock} />
                  ) : (
                    <span>Epoch in progress</span>
                  )
                }
              />

              {lastTimestamp && (
                <ExplorerGridRow
                  label="Last Block Timestamp"
                  value={toLocaleString(lastTimestamp)}
                />
              )}
            </ExplorerGrid>
          }
        />
      </ContentContainer>
    </StandardWindowContainer>
  );
}

export default Epoch;
