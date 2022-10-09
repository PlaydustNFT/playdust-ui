import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import playdustNftDataAtom from '../../../_atoms/playdustNftDataAtom';
import CardImageContainer from '../../../_sharedComponents/CardImageContainer';

const BlurImage = styled.img`
  filter: blur(1.5rem);
`;

const BlurImageContainer = styled.div`
  overflow: hidden;
`;

const VisibilityContainer = styled.div`
  cursor: pointer;
  padding: 5px 8px;
  position: absolute;
  z-index: 10;
`;

function NFTDetailsRenderMedia({ imageSize }: { imageSize: number }) {
  const playdustNftData = useRecoilValue(playdustNftDataAtom);
  const [visible, setVisible] = useState(false);

  if (!playdustNftData || !playdustNftData.mintOffChainMetadata) {
    return null;
  }

  const offChainData = playdustNftData.mintOffChainMetadata;

  const isNSFW = false;

  return isNSFW ? (
    <BlurImageContainer>
      <VisibilityContainer>
        {visible ? (
          <VisibilityOffIcon onClick={() => setVisible(false)} />
        ) : (
          <VisibilityIcon onClick={() => setVisible(true)} />
        )}
      </VisibilityContainer>
      {visible ? (
        <CardImageContainer
          src={offChainData.image}
          imageSize={imageSize}
          overlay={null}
        />
      ) : (
        <BlurImage
          alt={offChainData.name || ''}
          src={offChainData.image}
          height={imageSize}
        />
      )}
    </BlurImageContainer>
  ) : (
    <CardImageContainer
      src={offChainData.image}
      imageSize={imageSize}
      overlay={null}
    />
  );
}

export default NFTDetailsRenderMedia;
