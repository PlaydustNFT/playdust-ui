import { assign, Infer, literal, string, type } from 'superstruct';
import QueryNodeIdType from './QueryNodeBaseType';

type CollectionQueryNodeType = Infer<typeof CollectionQueryNodeType>;
const CollectionQueryNodeType = assign(
  type({
    field: literal('collection'),
    value: string(),
  }),
  QueryNodeIdType
);

export default CollectionQueryNodeType;
