import React from 'react';
import { useRecoilValue } from 'recoil';
import collectionOverviewAtom from '../../_atoms/collectionOverviewAtom';
import CollectionOverview from '../../_sharedComponents/CollectionOverview/CollectionOverview';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';

function MetaplexNFTCollectionOverview() {
  const overview = useRecoilValue(collectionOverviewAtom);

  if (!overview) {
    return null;
  }

  return (
    <ExplorerAccordion
      id="collection-overview"
      title="Collection Overview"
      expanded={true}
      content={<CollectionOverview />}
    />
  );
}

export default MetaplexNFTCollectionOverview;
