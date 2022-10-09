import OrderType from './OrderType';

type TradingDialogType =
  | {
      type: 'newBid';
      wallet: string;
      mintAddress: string;
    }
  | {
      type: 'newAsk';
      wallet: string;
      mintAddress: string;
    }
  | {
      type: 'acceptBid';
      wallet: string;
      mintAddress: string;
      bid: OrderType<'bid'>;
    }
  | {
      type: 'acceptAsk';
      wallet: string;
      mintAddress: string;
      ask: OrderType<'ask'>;
    }
  | {
      type: 'cancelBid';
      wallet: string;
      mintAddress: string;
      bid: OrderType<'bid'>;
    }
  | {
      type: 'cancelAsk';
      wallet: string;
      mintAddress: string;
      ask: OrderType<'ask'>;
    };

export default TradingDialogType;
