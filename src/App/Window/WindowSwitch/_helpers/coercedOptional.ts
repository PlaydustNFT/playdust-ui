import { coerce, nullable, optional, Struct } from 'superstruct';

function coercedOptional<StructType>(struct: Struct<StructType>) {
  return coerce(
    optional(struct),
    optional(nullable(struct)),
    (value): undefined | StructType => {
      if (value === undefined || value === null) {
        return undefined;
      }

      return value;
    }
  );
}

export default coercedOptional;
