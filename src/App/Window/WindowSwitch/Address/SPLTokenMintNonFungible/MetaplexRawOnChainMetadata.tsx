import dynamic from 'next/dynamic';
import React from 'react';
import { useRecoilValue } from 'recoil';
import playdustNftDataAtom from '../../_atoms/playdustNftDataAtom';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';

// react-json-view can only be client render since it uses window
const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
});

function MetaplexRawOnChainMetadata() {
  const playdustNftData = useRecoilValue(playdustNftDataAtom);

  if (!playdustNftData || !playdustNftData.mintOnChainMetadata) {
    return null;
  }

  return (
    <ExplorerAccordion
      title="Raw On-Chain Metaplex Metadata"
      content={
        <DynamicReactJson
          name={null}
          src={playdustNftData.mintOnChainMetadata}
          collapseStringsAfterLength={50}
          groupArraysAfterLength={20}
        />
      }
    />
  );
}

export default MetaplexRawOnChainMetadata;
