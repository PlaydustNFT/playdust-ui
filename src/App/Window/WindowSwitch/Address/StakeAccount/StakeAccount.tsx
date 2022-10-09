import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import AuthoritiesCard from './AuthoritiesCard';
import DelegationCard from './DelegationCard';
import LockupCard from './LockupCard';
import OverviewCard from './OverviewCard';
import parsedStakeAccountAtom from './_atoms/parsedStakeAccountAtom';

// Stake11111111111111111111111111111111111111
// AD8QGGAk1fJUYsyGPidF1Xu4TS4koc4BLirc1YE8uMxQ
function StakeAccount() {
  const parsedStakeAccount = useRecoilValue(parsedStakeAccountAtom);

  if (!parsedStakeAccount) {
    return null;
  }

  return (
    <ExplorerAccordion
      title="Stake Account Info"
      expanded={true}
      content={
        <>
          <LockupCard />
          <OverviewCard />
          <DelegationCard />
          <AuthoritiesCard />
        </>
      }
    />
  );
}

export default StakeAccount;
