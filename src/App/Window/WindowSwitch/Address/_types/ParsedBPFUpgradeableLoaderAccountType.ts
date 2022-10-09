import {
  Infer,
  literal,
  nullable,
  string,
  type,
  union,
  unknown,
} from 'superstruct';
import ProgramAccountType from './ProgramAccountType';
import ProgramDataAccountType from './ProgramDataAccountType';

type ProgramBufferAccountInfo = Infer<typeof ProgramBufferAccountInfo>;
const ProgramBufferAccountInfo = type({
  authority: nullable(string()),
  // don't care about data yet
});

type ProgramBufferAccount = Infer<typeof ProgramBufferAccount>;
const ProgramBufferAccount = type({
  type: literal('buffer'),
  info: ProgramBufferAccountInfo,
});

type ProgramUninitializedAccountInfo = Infer<
  typeof ProgramUninitializedAccountInfo
>;
const ProgramUninitializedAccountInfo = unknown();

type ProgramUninitializedAccount = Infer<typeof ProgramUninitializedAccount>;
const ProgramUninitializedAccount = type({
  type: literal('uninitialized'),
  info: ProgramUninitializedAccountInfo,
});

type ParsedBPFUpgradeableLoaderAccountType = Infer<
  typeof ParsedBPFUpgradeableLoaderAccountType
>;
const ParsedBPFUpgradeableLoaderAccountType = union([
  ProgramAccountType,
  ProgramDataAccountType,
  ProgramBufferAccount,
  ProgramUninitializedAccount,
]);

export default ParsedBPFUpgradeableLoaderAccountType;
