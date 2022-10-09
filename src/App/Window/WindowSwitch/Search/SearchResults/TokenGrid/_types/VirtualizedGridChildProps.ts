import type RowMetaProps from './RowMetaProps';

interface VirtualizedGridChildProps extends RowMetaProps {
  index: number;
  isLoading: boolean;
}

export default VirtualizedGridChildProps;
