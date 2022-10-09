import { Link } from '@mui/material';
import React from 'react';

interface ExternalLinkProps {
  label?: string;
  url?: string;
}

function ExternalLink({ label, url }: ExternalLinkProps) {
  return url ? (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      {label || url}
    </Link>
  ) : null;
}

export default ExternalLink;
