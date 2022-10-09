import { Box, Card } from '@mui/material';
import React from 'react';

interface UserProfileCardProps {
  avatar: React.ReactNode;
  content: React.ReactNode;
}

function UserProfileCard({ avatar, content }: UserProfileCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        '.MuiCardContent-root': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        '.MuiCardActions-root': {
          p: 2,
        },
        '.MuiAvatar-root': { width: 150, height: 150 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 215,
          minWidth: 215,
          p: 2,
          pr: 0,
        }}
      >
        {avatar}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {content}
      </Box>
    </Card>
  );
}

export default UserProfileCard;
