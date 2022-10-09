import { Infer, union } from 'superstruct';
import AttributeQueryNodeType from './AttributeQueryNodeType';
import CollectionQueryNodeType from './CollectionQueryNodeType';
import RangeQueryNodeType from './RangeQueryNodeType';
import TextQueryNodeType from './TextQueryNodeType';

type QueryNodeType = Infer<typeof QueryNodeType>;
const QueryNodeType = union([
  CollectionQueryNodeType,
  AttributeQueryNodeType,
  RangeQueryNodeType,
  TextQueryNodeType,
]);

export default QueryNodeType;
