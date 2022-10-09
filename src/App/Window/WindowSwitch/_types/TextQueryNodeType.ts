import { assign, Infer, literal, string, type } from 'superstruct';
import QueryNodeIdType from './QueryNodeBaseType';

type TextQueryNodeType = Infer<typeof TextQueryNodeType>;
const TextQueryNodeType = assign(
  type({
    field: literal('text'),
    value: string(),
  }),
  QueryNodeIdType
);

export default TextQueryNodeType;
