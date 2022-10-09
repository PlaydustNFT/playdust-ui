import { Infer, literal, type } from 'superstruct';
import ProgramAccountInfoType from './ProgramAccountInfoType';

type ProgramAccountType = Infer<typeof ProgramAccountType>;
const ProgramAccountType = type({
  type: literal('program'),
  info: ProgramAccountInfoType,
});

export default ProgramAccountType;
