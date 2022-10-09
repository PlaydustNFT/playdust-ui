import {
  Infer,
  literal,
  nullable,
  number,
  string,
  tuple,
  type,
} from 'superstruct';

type ProgramDataAccountInfoType = Infer<typeof ProgramDataAccountInfoType>;
const ProgramDataAccountInfoType = type({
  authority: nullable(string()),
  data: tuple([string(), literal('base64')]),
  slot: number(),
});

export default ProgramDataAccountInfoType;
