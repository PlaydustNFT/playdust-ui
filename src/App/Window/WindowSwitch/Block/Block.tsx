import React from 'react';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import ContentContainer from '../_sharedComponents/ContentContainer';
import StandardWindowContainer from '../_sharedComponents/StandardWindowContainer';
import BlockDetails from './BlockDetails/BlockDetails';
import BlockOverview from './BlockOverview/BlockOverview';

function Block() {
  return (
    <StandardWindowContainer>
      <ContentContainer>
        <SuspenseBoundary
          content={<BlockOverview />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<BlockDetails />}
          error={null}
          loading={null}
        />
      </ContentContainer>
    </StandardWindowContainer>
  );
}

export default Block;
