type InstructionErrorType =
  | { Custom: string }
  | { BorshIoError: string }
  | string;

export default InstructionErrorType;
