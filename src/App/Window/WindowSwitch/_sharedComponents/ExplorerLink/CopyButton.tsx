import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import copy from 'copy-text-to-clipboard';
import React from 'react';

interface CopyButtonProps {
  value: string | number;
}

function CopyButton({ value }: CopyButtonProps) {
  return (
    <IconButton edge="start" onClick={() => copy(String(value))} size="small">
      <ContentCopyIcon />
    </IconButton>
  );
}

export default CopyButton;
