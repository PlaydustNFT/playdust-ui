import OrderType from './OrderType';

type AllOrdersType = {
  asks: OrderType<'ask'>[];
  bids: OrderType<'bid'>[];
};

export default AllOrdersType;
