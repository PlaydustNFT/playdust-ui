import { assign, Infer, literal, number, optional, type } from 'superstruct';
import QueryNodeIdType from './QueryNodeBaseType';
import RangeValueUnionType from './RangeValueUnionType';

type RangeQueryNodeType = Infer<typeof RangeQueryNodeType>;
const RangeQueryNodeType = assign(
  type({
    field: literal('range'),
    value: RangeValueUnionType,
    min: optional(number()),
    max: optional(number()),
  }),
  QueryNodeIdType
);

export default RangeQueryNodeType;
