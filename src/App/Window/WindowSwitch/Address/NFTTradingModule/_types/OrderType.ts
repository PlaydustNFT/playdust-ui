type OrderType<Side> = {
  id: string;
  auctionHouse: string;
  wallet: string;
  mint: string;
  txHash: string;
  qty: number;
  price: number;
  side: Side;
  treasuryMint: string;
};

export default OrderType;
