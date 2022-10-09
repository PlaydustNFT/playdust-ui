import { SvgIcon, SvgIconProps } from '@mui/material';
import React from 'react';
import GroupRenderNodeType from '../_types/GroupRenderNodeType';

interface GroupEndIconProps extends SvgIconProps {
  type: GroupRenderNodeType['type'];
}

function GroupEndIcon({
  type,
  width = 8,
  height = 28,
  stroke,
  ...props
}: GroupEndIconProps) {
  return (
    <SvgIcon
      {...props}
      viewBox={`0 0 ${width} ${height}`}
      sx={{
        width,
        height,
        fill: 'none',
        ...(type === 'groupEnd' && {
          transform: 'scaleX(-1)',
        }),
      }}
    >
      <path
        d="M8 26H6C3.79086 26 2 24.2091 2 22V6C2 3.79086 3.79086 2 6 2H8"
        stroke={stroke}
        strokeWidth="4"
      />
    </SvgIcon>
  );
}

export default GroupEndIcon;
