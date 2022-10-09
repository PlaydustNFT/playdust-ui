import React from 'react';
import SuspenseBoundary from '../../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import SPLTokenMintFungibleHeader from './SPLTokenMintFungibleHeader';
import SPLTokenMintFungibleStats from './SPLTokenMintFungibleStats/SPLTokenMintFungibleStats';

// Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
function SPLTokenMintFungible() {
  return (
    <>
      <SuspenseBoundary
        content={<SPLTokenMintFungibleHeader />}
        error={null}
        loading={null}
      />
      <SuspenseBoundary
        content={<SPLTokenMintFungibleStats />}
        error={null}
        loading={null}
      />
    </>
  );
}

export default SPLTokenMintFungible;
