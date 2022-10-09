import tradeApiInstance from '../../_helpers/tradeApi';
import TransactionBuffer from '../_types/TransactionBufferType';
import TransactionHash from '../_types/TransactionHashType';

const executeNFTSale = async (
  requestData: TransactionBuffer,
  txBuff: number[]
): Promise<TransactionHash> => {
  const { data } = await tradeApiInstance.post<TransactionHash>(`/execute`, {
    ...requestData,
    txBuff,
  });

  return data;
};

export default executeNFTSale;
