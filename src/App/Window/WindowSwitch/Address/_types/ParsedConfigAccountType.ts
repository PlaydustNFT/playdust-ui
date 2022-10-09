import { Infer, union } from 'superstruct';
import { ParsedConfigAccountStakeConfigType } from './ParsedConfigAccountStakeConfigType';
import { ParsedConfigAccountValidatorInfoType } from './ParsedConfigAccountValidatorInfoType';

export type ParsedConfigAccountType = Infer<typeof ParsedConfigAccountType>;
export const ParsedConfigAccountType = union([
  ParsedConfigAccountStakeConfigType,
  ParsedConfigAccountValidatorInfoType,
]);
