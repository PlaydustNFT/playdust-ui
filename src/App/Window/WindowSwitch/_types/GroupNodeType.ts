import { array, enums, Infer, literal, object, string } from 'superstruct';

type GroupNodeType = Infer<typeof GroupNodeType>;
const GroupNodeType = object({
  id: string(),
  type: literal('group'),
  operator: enums(['and', 'or']),
  children: array(string()),
});

export default GroupNodeType;
