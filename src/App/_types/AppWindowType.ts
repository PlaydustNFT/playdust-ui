import { array, Infer, object, optional, string } from 'superstruct';
import { WindowUnionType } from './WindowUnionType';

type AppWindowType = Infer<typeof AppWindowType>;
const AppWindowType = object({
  state: string(),
  type: WindowUnionType,
  images: optional(array(string())),
});

export default AppWindowType;
