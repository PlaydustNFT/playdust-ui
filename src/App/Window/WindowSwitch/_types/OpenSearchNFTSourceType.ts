import {
  array,
  boolean,
  enums,
  Infer,
  number,
  string,
  type,
} from 'superstruct';
import coercedDefaulted from '../_helpers/coercedDefaulted';
import coercedOptional from '../_helpers/coercedOptional';
import CollectionEnumType from './CollectionEnumType';

const MarketPlaceType = enums(['MagicEdenV1', 'MagicEdenV2']);
const AsksBidsType = coercedDefaulted(
  array(
    type({
      marketplace: coercedOptional(MarketPlaceType),
      price: coercedDefaulted(number(), 0),
    })
  ),
  []
);

type OpenSearchNFTSourceType = Infer<typeof OpenSearchNFTSourceType>;
const OpenSearchNFTSourceType = type({
  image: coercedDefaulted(string(), ''),
  mint: coercedDefaulted(string(), ''),
  name: coercedDefaulted(string(), ''),
  uri: coercedDefaulted(string(), ''),
  asks: AsksBidsType,
  attributes: coercedDefaulted(
    array(
      type({
        key: coercedDefaulted(string(), ''),
        value: coercedDefaulted(string(), ''),
      })
    ),
    []
  ),
  bids: AsksBidsType,
  collectionDescription: coercedOptional(string()),
  collectionName: coercedOptional(string()),
  collectionSymbol: coercedOptional(string()),
  collections: coercedOptional(
    array(
      type({
        id: coercedDefaulted(string(), ''),
        type: coercedDefaulted(CollectionEnumType, 'Derived'),
      })
    )
  ),
  primaryCollection: coercedOptional(string()),
  isCollection: coercedDefaulted(boolean(), false),
  lastSalePrice: coercedDefaulted(number(), 0),
  listedPrice: coercedOptional(number()),
  normalizedRarityScore: coercedOptional(number()),
  normalizedStatisticalRarity: coercedOptional(number()),
  symbol: coercedOptional(string()),
  totalVolume: coercedDefaulted(number(), 0),
});

export default OpenSearchNFTSourceType;
