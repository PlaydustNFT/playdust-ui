import tradeApi from '../../../_helpers/tradeApi';
import TransactionBuffer from '../../_types/TransactionBufferType';

const cancelNFTListing = async (
  wallet: string,
  mint: string,
  buyPrice: number
): Promise<TransactionBuffer> => {
  const { data } = await tradeApi.post<TransactionBuffer>(`/cancel-ask`, {
    wallet,
    mint,
    buyPrice,
    tokenSize: 1,
  });

  return data;
};

export default cancelNFTListing;
