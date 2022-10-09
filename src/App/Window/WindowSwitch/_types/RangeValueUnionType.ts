import { enums, Infer } from 'superstruct';

type RangeValueUnionType = Infer<typeof RangeValueUnionType>;
const RangeValueUnionType = enums(['list-price', 'sale-price', 'rarity-score']);

export default RangeValueUnionType;
