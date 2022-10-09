import { Infer, literal, type } from 'superstruct';
import ProgramDataAccountInfoType from './ProgramDataAccountInfoType';

type ProgramDataAccountType = Infer<typeof ProgramDataAccountType>;
const ProgramDataAccountType = type({
  type: literal('programData'),
  info: ProgramDataAccountInfoType,
});

export default ProgramDataAccountType;
