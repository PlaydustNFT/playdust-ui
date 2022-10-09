import { array, Infer, number, object, string } from 'superstruct';

type SearchAggResponseType = Infer<typeof SearchAggResponseType>;
const SearchAggResponseType = array(
  object({
    key: string(),
    values: array(
      object({
        value: string(),
        count: number(),
      })
    ),
  })
);

export default SearchAggResponseType;
