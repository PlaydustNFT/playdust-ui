import { atom } from 'recoil';
import TradingDialogType from '../_types/TradingDialogType';

const tradingDialogAtom = atom<TradingDialogType | null>({
  key: 'tradingDialogAtom',
  default: null,
});

export default tradingDialogAtom;
