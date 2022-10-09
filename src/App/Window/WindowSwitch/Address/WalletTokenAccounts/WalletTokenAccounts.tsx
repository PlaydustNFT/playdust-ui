import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import tokenRegistryAtom from '../../_atoms/tokenRegistryAtom';
import ExplorerAccordion from '../../_sharedComponents/ExplorerAccordion';
import ExplorerLink from '../../_sharedComponents/ExplorerLink/ExplorerLink';
import LabeledAddressLink from '../../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import tokenAccountsForAddressAtom from '../_atoms/tokenAccountsForAddressAtom';
import useIsWallet from '../_hooks/useIsWallet';
import PaginatedList from '../_sharedComponents/PaginatedList';
import TokenAccountsType from '../_types/TokenAccountsType';
import useIsProgram from './_hooks/useIsProgram';

function RenderTokenAccount({
  tokenAccount,
}: {
  tokenAccount: TokenAccountsType;
}) {
  const tokenRegistry = useRecoilValue(tokenRegistryAtom);
  const mintAddress = tokenAccount.data.info.mint;
  const balance = tokenAccount.data.info.tokenAmount.uiAmountString;
  const tokenInfo = tokenRegistry.get(safePubkeyString(mintAddress) ?? '');
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {tokenInfo?.logoURI && (
          <img
            src={tokenInfo?.logoURI}
            height={32}
            style={{
              margin: '-8px 0',
            }}
            alt={`Token logo (${String(tokenInfo?.symbol ?? '')})`}
          />
        )}
      </TableCell>
      <TableCell>
        <ExplorerLink
          type="address"
          to={tokenAccount.pubkey}
          ellipsis={{
            remain: 4,
            cutoff: 4,
          }}
        />
      </TableCell>
      <TableCell>
        {mintAddress && (
          <LabeledAddressLink
            to={mintAddress}
            ellipsis={{
              remain: 4,
              cutoff: 4,
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {`${String(balance)} ${String(tokenInfo?.symbol ?? '')}`}
      </TableCell>
    </TableRow>
  );
}

function RenderTokenAccounts() {
  const tokenAccounts = useRecoilValue(tokenAccountsForAddressAtom);

  return (
    <PaginatedList
      items={tokenAccounts}
      itemsPerPage={10}
      renderContainer={(children) => (
        <Table sx={{ paddingBottom: '24px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Account Address</TableCell>
              <TableCell>Mint Address</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      )}
      renderItem={(tokenAccount) => (
        <RenderTokenAccount
          tokenAccount={tokenAccount}
          key={String(tokenAccount.pubkey)}
        />
      )}
    />
  );
}

function WalletTokenAccounts() {
  const isWallet = useIsWallet();
  const isProgram = useIsProgram();

  if (!isWallet && !isProgram) {
    return null;
  }

  return (
    <ExplorerAccordion
      id="tokens"
      title="Tokens"
      content={<RenderTokenAccounts />}
    />
  );
}

export default WalletTokenAccounts;
