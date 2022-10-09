import { atom, selector } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../../_atoms/addressStateAtom';
import fetchTransactionsForAddress from '../_helpers/fetchTransactionsForAddress';
import AddressTransactionsType from '../_types/AddressTransactionsType';

const limit = 10;

const defaultAddressTransactionsAtom = selector<AddressTransactionsType>({
  key: 'defaultAddressTransactionsAtom',
  get: async ({ get }) => {
    const addressState = get(addressStateAtom);
    const cluster = get(solanaClusterAtom);
    if (!addressState) {
      return { transactions: [], done: true };
    }

    const transactions = await fetchTransactionsForAddress(
      cluster,
      addressState.pubkey,
      limit
    );
    const done = transactions.length < limit;

    return { transactions, done };
  },
});

const addressTransactionsAtom = atom<AddressTransactionsType>({
  key: 'addressTransactionsAtom',
  default: defaultAddressTransactionsAtom,
});

export default addressTransactionsAtom;
