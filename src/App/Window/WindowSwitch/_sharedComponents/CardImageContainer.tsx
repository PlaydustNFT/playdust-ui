import { BrokenImage } from '@mui/icons-material';
import { Box, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CardImageContainerProps {
  src?: string;
  imageSize: number;
  censored?: boolean;
  overlay: JSX.Element | null;
}

function CardImageContainer({
  src,
  imageSize,
  censored,
  overlay,
}: CardImageContainerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '300px 0px',
  });

  return (
    <div ref={ref} data-inview={inView} style={{ overflow: 'hidden' }}>
      {src ? (
        <Box
          component="div"
          sx={{
            position: 'relative',
            maxHeight: imageSize,
            width: imageSize,
            height: imageSize,
            minHeight: imageSize,
          }}
        >
          {inView ? (
            <>
              <div
                style={{
                  position: 'absolute',
                  objectFit: 'cover',
                  width: imageSize,
                  height: imageSize,
                  filter: censored ? 'blur(1.5rem)' : 'none',
                  opacity: Number(isLoaded || isError),
                  transition: 'all .5s ease',
                  backgroundColor: isError
                    ? 'rgba(20, 20, 20, 0.11)'
                    : 'currentcolor',
                }}
              >
                {!isError ? (
                  <img // eslint-disable-line @next/next/no-img-element
                    src={src}
                    alt=""
                    width={imageSize}
                    height={imageSize}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                  />
                ) : (
                  <BrokenImage sx={{ fontSize: imageSize, color: '#fefefe' }} />
                )}
              </div>
              {overlay && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  m={1}
                >
                  {overlay}
                </Box>
              )}
            </>
          ) : null}
          <Skeleton
            sx={{
              position: 'absolute',
              height: imageSize,
              width: imageSize,
              opacity: Number(!(isLoaded || isError)),
              transition: 'all .5s ease',
            }}
            animation="wave"
            variant="rectangular"
          />
        </Box>
      ) : (
        <Skeleton
          sx={{
            height: imageSize,
            width: imageSize,
          }}
          animation="wave"
          variant="rectangular"
        />
      )}
    </div>
  );
}

export default CardImageContainer;
