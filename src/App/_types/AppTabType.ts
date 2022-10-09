import { array, Infer, number, object, string } from 'superstruct';
import AppWindowType from './AppWindowType';

type AppTabType = Infer<typeof AppTabType>;
const AppTabType = object({
  id: string(),
  windows: array(AppWindowType),
  selectedWindowIdx: number(),
});

export default AppTabType;
