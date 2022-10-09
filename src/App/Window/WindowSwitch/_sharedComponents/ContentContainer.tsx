import { Box, Container, Stack, SxProps, Theme } from '@mui/material';
import React from 'react';

type ContentContainerProps = {
  sx?: SxProps<Theme>;
};

function ContentContainer({
  sx,
  children,
}: React.PropsWithChildren<ContentContainerProps>) {
  return (
    <Box
      sx={{
        margin: '16px 0px',
        ...sx,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2}>{children}</Stack>
      </Container>
    </Box>
  );
}

export default ContentContainer;
