import { enums, Infer } from 'superstruct';

type CollectionEnumType = Infer<typeof CollectionEnumType>;
const CollectionEnumType = enums([
  'MagicEden',
  'Metaplex',
  'Derived',
  'Manual',
]);

export default CollectionEnumType;
