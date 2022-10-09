import { coerce, nullable, optional, Struct } from 'superstruct';

function coercedDefaulted<StructType>(
  struct: Struct<StructType>,
  defaultValue: StructType
) {
  return coerce(struct, optional(nullable(struct)), (value): StructType => {
    if (value === undefined || value === null) {
      return defaultValue;
    }

    return value;
  });
}

export default coercedDefaulted;
