import { Box } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import ellipsisify from '../../../../_helpers/ellipsisify';
import encodeWindowHash from '../../../../_helpers/encodeWindowHash';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import Link from '../../../_sharedComponents/Link';
import ExplorerLinkProps from '../_types/ExplorerLinkProps';
import CopyButton from './CopyButton';

function ExplorerLink({
  to,
  label,
  allowCopy,
  ellipsis,
  type,
  component = 'span',
}: ExplorerLinkProps) {
  const windowState = useRecoilValue(windowStateAtom);
  const toString = safePubkeyString(to);
  const fullLabel = label ?? toString;
  const shortLabel = ellipsis
    ? ellipsisify(
        fullLabel,
        ellipsis.cutoff,
        ellipsis.remain,
        ellipsis.ellipsis
      )
    : fullLabel;
  const isShortened = fullLabel.length > shortLabel.length;
  const display = isShortened ? shortLabel : fullLabel;
  const href = encodeWindowHash({
    type,
    state: toString,
    tabId: windowState.tabId,
  });
  return (
    <Box sx={{ whiteSpace: 'nowrap' }} component={component}>
      {allowCopy && <CopyButton value={toString} />}
      <Link href={href} title={toString}>
        <pre style={{ display: 'inline' }}>{display}</pre>
      </Link>
      {isShortened && <sub>{` ${fullLabel.length}`}</sub>}
    </Box>
  );
}

export default ExplorerLink;
