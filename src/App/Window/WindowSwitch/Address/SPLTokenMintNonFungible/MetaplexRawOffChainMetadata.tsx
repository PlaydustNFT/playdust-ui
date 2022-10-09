import dynamic from 'next/dynamic';
import React from 'react';
import { useRecoilValue } from 'recoil';
import playdustNftDataAtom from '../../_atoms/playdustNftDataAtom';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';

// react-json-view can only be client render since it uses window
const DynamicReactJson = dynamic(import('react-json-view'), {
  ssr: false,
});

function MetaplexRawOffChainMetadata() {
  const playdustNftData = useRecoilValue(playdustNftDataAtom);

  if (!playdustNftData || !playdustNftData.mintOffChainMetadata) {
    return null;
  }

  return (
    <ExplorerAccordion
      title="Raw Off-Chain Metaplex Metadata"
      content={
        <DynamicReactJson
          name={null}
          src={playdustNftData.mintOffChainMetadata}
          collapseStringsAfterLength={50}
          groupArraysAfterLength={20}
        />
      }
    />
  );
}

export default MetaplexRawOffChainMetadata;
