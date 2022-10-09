import { assert, Infer, literal, union } from 'superstruct';

const pdEnv = process.env.PD_ENV;

type PdEnvType = Infer<typeof PdEnvType>;
const PdEnvType = union([
  literal('local'),
  literal('production'),
  literal('staging-mainnet'),
  literal('staging-devnet'),
]);

assert(pdEnv, PdEnvType);

function getPDEnv(): PdEnvType {
  return pdEnv as PdEnvType;
}

export default getPDEnv;
