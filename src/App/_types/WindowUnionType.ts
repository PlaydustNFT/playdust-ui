import { enums, Infer } from 'superstruct';

export type WindowUnionType = Infer<typeof WindowUnionType>;
export const WindowUnionType = enums([
  'address',
  'block',
  'home',
  'search',
  'tx',
  'epoch',
]);
