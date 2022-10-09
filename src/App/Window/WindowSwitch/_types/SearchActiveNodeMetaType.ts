type SearchActiveNodeMetaType =
  | {
      type: 'query';
      nodeId: string;
    }
  | {
      type: 'group';
      nodeId: string;
      index: number;
      endIndex?: number;
    };

export default SearchActiveNodeMetaType;
