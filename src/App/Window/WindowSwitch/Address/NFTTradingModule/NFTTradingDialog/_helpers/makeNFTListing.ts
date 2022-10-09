import tradeApi from '../../_helpers/tradeApi';
import TransactionBuffer from '../_types/TransactionBufferType';

const makeNFTListing = async (
  wallet: string,
  mint: string,
  buyPrice: number
): Promise<TransactionBuffer> => {
  const { data } = await tradeApi.post<TransactionBuffer>(`/ask`, {
    wallet,
    mint,
    buyPrice,
    tokenSize: 1,
  });

  return data;
};

export default makeNFTListing;
