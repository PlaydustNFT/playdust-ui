import { array, Infer, object, string } from 'superstruct';
import AppTabType from './AppTabType';

export type AppStateType = Infer<typeof AppStateType>;
export const AppStateType = object({
  tabs: array(AppTabType),
  selectedTabId: string(),
});
