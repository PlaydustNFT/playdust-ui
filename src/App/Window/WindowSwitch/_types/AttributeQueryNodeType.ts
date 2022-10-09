import { assign, Infer, literal, string, type } from 'superstruct';
import QueryNodeBaseType from './QueryNodeBaseType';

type AttributeQueryNodeType = Infer<typeof AttributeQueryNodeType>;
const AttributeQueryNodeType = assign(
  type({
    field: literal('attribute'),
    key: string(),
    value: string(),
  }),
  QueryNodeBaseType
);

export default AttributeQueryNodeType;
