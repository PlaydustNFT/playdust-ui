import InstructionErrorType from './InstructionErrorType';

type TransactionErrorDetailsType = {
  InstructionError: [errorIndex: number, error: InstructionErrorType];
};

export default TransactionErrorDetailsType;
