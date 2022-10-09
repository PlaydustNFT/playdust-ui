import { Box, Card } from '@mui/material';
import React from 'react';
import Link from '../../../_sharedComponents/Link';
import CardImageContainer from '../CardImageContainer';
import TokenCardContentContainer from './_sharedComponents/TokenCardContentContainer';

interface ImageCardProps {
  src?: string;
  href: string;
  imageSize: number;
  content: JSX.Element | null;
  contentHeight: number;
  censored?: boolean;
  overlay: JSX.Element | null;
}

function ImageCard({
  src,
  href,
  imageSize,
  content,
  contentHeight,
  censored,
  overlay,
}: ImageCardProps) {
  return (
    <Card sx={{ minWidth: imageSize, maxWidth: imageSize }}>
      <Link href={href}>
        <CardImageContainer
          src={src}
          imageSize={imageSize}
          censored={censored}
          overlay={overlay}
        />
      </Link>
      {content && (
        <Box
          sx={{
            maxHeight: contentHeight,
            height: contentHeight,
            width: '100%',
            fontSize: '80%',
          }}
        >
          <TokenCardContentContainer>{content}</TokenCardContentContainer>
        </Box>
      )}
    </Card>
  );
}

export default ImageCard;
