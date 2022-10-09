type TradingDialogContentProps<T> = {
  close: () => void;
  execute: ExecuteAction;
  action: T;
};

type ExecuteAction = (execute: () => Promise<string>) => void;

export default TradingDialogContentProps;
