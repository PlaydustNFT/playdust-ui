import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';
import logger from '../../../../../../_helpers/logger';
import executeNFTSale from '../_helpers/executeNFTSale';

const useConfirmTransaction = () => {
  const { publicKey, signTransaction } = useWallet();

  return async (
    dataPromise: Promise<{ txBuff: Buffer }>,
    success: string,
    error: string
  ): Promise<string> => {
    try {
      const data = await dataPromise;

      if (signTransaction && publicKey) {
        const transaction = Transaction.from(data?.txBuff);

        await signTransaction(transaction);

        await executeNFTSale(data, [
          ...new Uint8Array(transaction.serialize()),
        ]);

        return success;
      }

      throw new Error(error);
    } catch (e) {
      logger(`transaction failed: ${error}`, e);
      throw new Error(error);
    }
  };
};

export default useConfirmTransaction;
