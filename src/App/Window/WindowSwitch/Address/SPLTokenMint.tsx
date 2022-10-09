import { Chip } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../_helpers/safePubkeyString';
import addressStateAtom from '../_atoms/addressStateAtom';
import tokenRegistryAtom from '../_atoms/tokenRegistryAtom';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedTokenAccountAtom from './_atoms/parsedTokenAccountAtom';
import ExternalLink from './_sharedComponents/ExternalLink';

function normalizeTokenAmount(raw: string | number, decimals: number): number {
  let rawTokens: number;
  if (typeof raw === 'string') rawTokens = parseInt(raw, 10);
  else rawTokens = raw;
  return rawTokens / 10 ** decimals;
}

// Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB
function SPLTokenMint() {
  const addressState = useRecoilValue(addressStateAtom);
  const parsedTokenAccount = useRecoilValue(parsedTokenAccountAtom);
  const tokenRegistry = useRecoilValue(tokenRegistryAtom);

  if (
    !addressState ||
    !parsedTokenAccount ||
    parsedTokenAccount.type !== 'mint'
  ) {
    return null;
  }

  const tokenInfo = tokenRegistry.get(safePubkeyString(addressState.pubkey));

  const { info } = parsedTokenAccount;

  const { extensions = {}, tags = [] } = tokenInfo || {};

  const { website } = extensions;

  const tagChips = (
    <>
      {tags.map((tag: string) => (
        <Chip key={tag} label={tag} />
      ))}
    </>
  );

  return (
    <ExplorerAccordion
      title="SPL Token Mint Account Info"
      expanded={true}
      content={
        <ExplorerGrid>
          <ExplorerGridRow
            label="Current Supply"
            value={normalizeTokenAmount(info.supply, info.decimals)}
          />
          {website && (
            <ExplorerGridRow
              label="Website"
              value={<ExternalLink url={website} />}
            />
          )}
          <ExplorerGridRow
            label="Initialized"
            value={info.isInitialized ? 'Yes' : 'No'}
          />
          {info.mintAuthority && (
            <ExplorerGridRow
              label="Mint Authority"
              value={
                <LabeledAddressLink to={info.mintAuthority} allowCopy={true} />
              }
            />
          )}
          {info.freezeAuthority && (
            <ExplorerGridRow
              label="Freeze Authority"
              value={
                <LabeledAddressLink
                  to={info.freezeAuthority}
                  allowCopy={true}
                />
              }
            />
          )}
          <ExplorerGridRow label="Decimals" value={info.decimals} />
          {tags.length > 0 && <ExplorerGridRow label="Tags" value={tagChips} />}
        </ExplorerGrid>
      }
    />
  );
}

export default SPLTokenMint;
