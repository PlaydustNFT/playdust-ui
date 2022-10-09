import { Box } from '@mui/material';
import { Buffer } from 'buffer';
import React, { ReactNode } from 'react';

function HexData({ raw }: { raw: Buffer }) {
  if (!raw || raw.length === 0) {
    return null;
  }

  const chunks = [];
  const hexString = raw.toString('hex');
  for (let i = 0; i < hexString.length; i += 2) {
    chunks.push(hexString.slice(i, i + 2));
  }

  const SPAN_SIZE = 4;
  const ROW_SIZE = 4 * SPAN_SIZE;

  const divs: ReactNode[] = [];
  let spans: ReactNode[] = [];
  for (let i = 0; i < chunks.length; i += SPAN_SIZE) {
    const color = i % (2 * SPAN_SIZE) === 0 ? 'gray' : 'green';
    spans.push(
      <span key={i} style={{ color }}>
        {chunks.slice(i, i + SPAN_SIZE).join(' ')}&emsp;
      </span>
    );

    if (
      i % ROW_SIZE === ROW_SIZE - SPAN_SIZE ||
      i >= chunks.length - SPAN_SIZE
    ) {
      divs.push(<div key={i / ROW_SIZE}>{spans}</div>);

      // clear spans
      spans = [];
    }
  }

  return (
    <Box>
      <pre>{divs}</pre>
    </Box>
  );
}

export default HexData;
