import { TooltipProps } from '@mui/material';
import MuiTooltip from '@mui/material/Tooltip';
import React from 'react';

function Tooltip({ children, ...props }: TooltipProps) {
  return props.title ? (
    <MuiTooltip arrow={true} {...props}>
      <span>{children}</span>
    </MuiTooltip>
  ) : (
    children
  );
}

export default Tooltip;
