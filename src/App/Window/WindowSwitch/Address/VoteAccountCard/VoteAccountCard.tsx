import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../../_sharedComponents/ExplorerGridRow';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedVoteAccountAtom from './_atoms/parsedVoteAccountAtom';

// Fx9gdBmp4Rer7rxu139ofGKcx3iffKS91gg2kFUeBvjD
function VoteAccountCard() {
  const parsedVoteAccount = useRecoilValue(parsedVoteAccountAtom);

  if (!parsedVoteAccount) {
    return null;
  }

  const { info } = parsedVoteAccount;

  const lastTimestamp = DateTime.fromMillis(
    info.lastTimestamp.timestamp * 1000
  ).toLocaleString(DateTime.DATETIME_FULL);

  return (
    <ExplorerAccordion
      title="Vote Account Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label={`Authorized Voter ${
              info.authorizedVoters.length > 1 ? 's' : ''
            }`}
            value={
              <>
                {info.authorizedVoters.map(
                  (voter: { authorizedVoter: string }) => (
                    <LabeledAddressLink
                      key={voter.authorizedVoter.toString()}
                      to={voter.authorizedVoter}
                      allowCopy={true}
                    />
                  )
                )}
              </>
            }
          />

          <ExplorerGridRow
            label="Authorized Withdrawer"
            value={
              <LabeledAddressLink
                to={info.authorizedWithdrawer}
                allowCopy={true}
              />
            }
          />

          <ExplorerGridRow label="Last Timestamp" value={lastTimestamp} />

          <ExplorerGridRow label="Commission" value={`${info.commission}%`} />

          <ExplorerGridRow
            label="Root Slot"
            value={
              info.rootSlot !== null ? (
                <ExplorerLink
                  type="block"
                  to={info.rootSlot}
                  allowCopy={true}
                />
              ) : (
                'N/A'
              )
            }
          />
        </ExplorerGrid>
      }
    />
  );
}

export default VoteAccountCard;
