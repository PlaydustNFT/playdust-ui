import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../../_atoms/addressStateAtom';
import addressTransactionsAtom from '../_atoms/addressTransactionsAtom';
import fetchTransactionsForAddress from '../_helpers/fetchTransactionsForAddress';
import AddressTransactionsType from '../_types/AddressTransactionsType';

const limit = 10;

function useTransactionsForAddress(): [
  AddressTransactionsType,
  () => Promise<void>
] {
  const addressState = useRecoilValue(addressStateAtom);
  const cluster = useRecoilValue(solanaClusterAtom);
  const [addressTransactions, setAddressTransactions] = useRecoilState(
    addressTransactionsAtom
  );

  const fetchMoreTransactionsForAddress = useCallback(async () => {
    const lastSignature = addressTransactions.transactions.at(-1)?.signature;

    if (!addressState) {
      return;
    }

    const newTransactions = await fetchTransactionsForAddress(
      cluster,
      addressState.pubkey,
      limit,
      lastSignature
    );

    const done = newTransactions.length < limit;

    setAddressTransactions((curr) => ({
      transactions: [...curr.transactions, ...newTransactions],
      done,
    }));
  }, [addressState, cluster, addressTransactions, setAddressTransactions]);

  return [addressTransactions, fetchMoreTransactionsForAddress];
}

export default useTransactionsForAddress;
