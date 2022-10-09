import { Infer, literal, string, type } from 'superstruct';

type QueryNodeBaseType = Infer<typeof QueryNodeBaseType>;
const QueryNodeBaseType = type({
  id: string(),
  type: literal('query'),
});

export default QueryNodeBaseType;
