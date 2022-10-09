import { selector } from 'recoil';
import safePubkeyString from '../../../../../_helpers/safePubkeyString';
import addressStateAtom from '../../../_atoms/addressStateAtom';
import parsedTokenAccountAtom from '../../_atoms/parsedTokenAccountAtom';
import getOrdersForMint from '../_helpers/getOrdersForMint';
import AllOrdersType from '../_types/AllOrdersType';

const ordersForMintAtom = selector<AllOrdersType | null>({
  key: 'ordersForMintAtom',
  get: async ({ get }) => {
    const parsedAccount = get(parsedTokenAccountAtom);
    const addressState = get(addressStateAtom);

    if (!addressState || parsedAccount?.type !== 'mint') {
      return null;
    }

    const mint = safePubkeyString(addressState.pubkey);
    const orders = await getOrdersForMint(mint);

    orders.asks.sort((a, b) => a.price - b.price);
    orders.bids.sort((a, b) => b.price - a.price);

    return orders;
  },
});

export default ordersForMintAtom;
