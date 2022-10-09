import {
  array,
  boolean,
  Infer,
  literal,
  record,
  string,
  type,
} from 'superstruct';

type ConfigKey = Infer<typeof ConfigKey>;
const ConfigKey = type({
  pubkey: string(),
  signer: boolean(),
});

type ValidatorInfoConfigData = Infer<typeof ValidatorInfoConfigData>;
const ValidatorInfoConfigData = record(string(), string());

type ValidatorInfoConfigInfo = Infer<typeof ValidatorInfoConfigInfo>;
const ValidatorInfoConfigInfo = type({
  keys: array(ConfigKey),
  configData: ValidatorInfoConfigData,
});

export type ParsedConfigAccountValidatorInfoType = Infer<
  typeof ParsedConfigAccountValidatorInfoType
>;
export const ParsedConfigAccountValidatorInfoType = type({
  type: literal('validatorInfo'),
  info: ValidatorInfoConfigInfo,
});
