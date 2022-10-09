import { Infer, string, type } from 'superstruct';

type ProgramAccountInfoType = Infer<typeof ProgramAccountInfoType>;
const ProgramAccountInfoType = type({
  programData: string(),
});

export default ProgramAccountInfoType;
