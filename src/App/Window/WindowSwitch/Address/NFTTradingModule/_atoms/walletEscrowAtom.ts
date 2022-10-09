import { selector } from 'recoil';
import connectedWalletAtom from '../../../../../_atoms/connectedWalletAtom';
import tradeApi from '../_helpers/tradeApi';
import EscrowType from '../_types/EscrowType';

const walletEscrowAtom = selector<EscrowType | null>({
  key: 'walletEscrowAtom',
  get: async ({ get }) => {
    const connectedWallet = get(connectedWalletAtom);

    if (!connectedWallet) {
      return null;
    }

    const { data } = await tradeApi.get<EscrowType>(
      `/escrow/${connectedWallet}`
    );
    return data;
  },
});

export default walletEscrowAtom;
