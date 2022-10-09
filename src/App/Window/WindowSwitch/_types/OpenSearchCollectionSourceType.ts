import { array, Infer, integer, number, string, type } from 'superstruct';
import coercedDefaulted from '../_helpers/coercedDefaulted';
import coercedOptional from '../_helpers/coercedOptional';
import CollectionEnumType from './CollectionEnumType';

type OpenSearchCollectionSourceType = Infer<
  typeof OpenSearchCollectionSourceType
>;
const OpenSearchCollectionSourceType = type({
  name: coercedOptional(string()),
  symbol: coercedOptional(string()),
  image: coercedOptional(string()),
  attributes: coercedDefaulted(
    array(
      type({
        key: coercedDefaulted(string(), ''),
        values: coercedDefaulted(
          array(
            type({
              count: coercedDefaulted(integer(), 0),
              value: coercedDefaulted(string(), ''),
            })
          ),
          []
        ),
      })
    ),
    []
  ),
  ceilingPrice: coercedDefaulted(
    type({
      global: coercedDefaulted(number(), 0),
    }),
    {
      global: 0,
    }
  ),
  collectionType: coercedOptional(CollectionEnumType),
  description: coercedOptional(string()),
  elementCount: coercedDefaulted(integer(), 0),
  floorPrice: coercedDefaulted(
    type({
      global: coercedDefaulted(number(), 0),
    }),
    {
      global: 0,
    }
  ),
  id: coercedDefaulted(string(), ''),
  volume: coercedDefaulted(
    type({
      global: type({
        d1: coercedDefaulted(number(), 0),
        d30: coercedDefaulted(number(), 0),
        d7: coercedDefaulted(number(), 0),
        total: coercedDefaulted(number(), 0),
      }),
    }),
    {
      global: {
        d1: 0,
        d30: 0,
        d7: 0,
        total: 0,
      },
    }
  ),
});

export default OpenSearchCollectionSourceType;
