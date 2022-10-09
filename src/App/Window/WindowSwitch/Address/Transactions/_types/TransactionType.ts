import {
  ConfirmedSignatureInfo,
  ParsedConfirmedTransaction,
  TransactionSignature,
} from '@solana/web3.js';

type TransactionType = {
  parsedTransaction: ParsedConfirmedTransaction | null;
  signatureInfo: ConfirmedSignatureInfo;
  signature: TransactionSignature;
};

export default TransactionType;
