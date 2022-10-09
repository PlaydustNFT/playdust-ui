import styled from '@emotion/styled';
import { Chip, Theme, Typography } from '@mui/material';
import { alpha, lighten } from '@mui/material/styles';
import React from 'react';
import { useRecoilValue } from 'recoil';
import encodeWindowHash from '../../../../_helpers/encodeWindowHash';
import getCDNUrl from '../../../../_helpers/getCDNUrl';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import Link from '../../../_sharedComponents/Link';
import humanizeSolana from '../../_helpers/humanizeSolana';
import round from '../../_helpers/round';
import ImageCard from './ImageCard';
import SkeletonImageCard from './SkeletonImageCard';
import TokenCardFilter from './TokenCardFilter';
import type TokenCardProps from './_types/TokenCardProps';

const CardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardTextContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

const CardText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardSecondaryContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 90%;
  padding-bottom: 4px;
`;

const TokenCardFilterContainer = styled.div`
  margin-left: 8px;
`;

const PriceTypography = styled(Typography)`
  font-size: 100%;
`;

function TokenCard({
  imageSize,
  contentHeight,
  metadata,
  skeleton,
  disableQuickFilter = false,
}: TokenCardProps) {
  const windowState = useRecoilValue(windowStateAtom);
  const href = encodeWindowHash({
    type: 'address',
    state: metadata?.mint || '',
    tabId: windowState.tabId,
  });

  if (skeleton === true || !metadata) {
    return (
      <SkeletonImageCard imageSize={imageSize} contentHeight={contentHeight} />
    );
  }

  let listedOrLastPrice = <div />;
  if (metadata.listedPrice) {
    listedOrLastPrice = (
      <PriceTypography sx={{ fontWeight: 700 }}>
        {humanizeSolana(metadata.listedPrice, 2)}
      </PriceTypography>
    );
  } else if (metadata.lastSalePrice > 0) {
    listedOrLastPrice = (
      <PriceTypography
        sx={(theme: Theme) => ({
          color: lighten(theme.palette.text.primary, 0.7),
        })}
      >
        {humanizeSolana(metadata.lastSalePrice, 2)} last
      </PriceTypography>
    );
  }

  const overlay = metadata.normalizedRarityScore ? (
    <Chip
      sx={{ backgroundColor: alpha('#fff', 0.8) }}
      label={round(metadata.normalizedRarityScore, 2)}
    />
  ) : null;

  return (
    <ImageCard
      imageSize={imageSize}
      src={getCDNUrl(metadata.image)}
      href={href}
      content={
        contentHeight ? (
          <CardContentContainer>
            <CardTextContainer>
              <CardText>
                <Link href={href}>{metadata.name}</Link>
              </CardText>
            </CardTextContainer>
            <CardSecondaryContainer>
              {listedOrLastPrice}
              {!disableQuickFilter && (
                <TokenCardFilterContainer>
                  {metadata && metadata.attributes && (
                    <TokenCardFilter metadata={metadata} />
                  )}
                </TokenCardFilterContainer>
              )}
            </CardSecondaryContainer>
          </CardContentContainer>
        ) : null
      }
      contentHeight={contentHeight}
      overlay={overlay}
    />
  );
}

export default TokenCard;
