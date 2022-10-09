import AttributeQueryNodeType from './AttributeQueryNodeType';

type AttributeQueryMapType = {
  [key: string]: {
    [value: string]: AttributeQueryNodeType;
  };
};

export default AttributeQueryMapType;
