import { selector } from 'recoil';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import TxExplorerType from '../_types/TxExplorerType';

const txStateAtom = selector<TxExplorerType | null>({
  key: 'txStateAtom',
  get: ({ get }) => {
    const windowState = get(windowStateAtom);

    if (windowState?.type !== 'tx') {
      return null;
    }

    const { type, state } = windowState;

    return {
      type,
      state,
    };
  },
});

export default txStateAtom;
