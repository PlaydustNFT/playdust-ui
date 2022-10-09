import type { SearchRequest } from '@opensearch-project/opensearch/api/types';
import { defaulted, number, type } from 'superstruct';
import type TopCollectionsResponseType from '../App/Window/WindowSwitch/Home/TopCollections/_types/TopCollectionsResponseType';
import getRarestNFTsByCollectionBody from './_helpers/getRarestNFTsByCollectionBody';
import nextApiHandler from './_helpers/nextApiHandler';
import searchCollections from './_helpers/searchCollections';
import searchNFTs from './_helpers/searchNFTs';

const collectionPageSize = 25;
const topCollectionLimit = 100;

const getTopCollectionQuery = (page: number): SearchRequest['body'] => ({
  _source: {
    exclude: ['attributes'],
  },
  size: collectionPageSize,
  from: page * collectionPageSize,
  sort: [
    '_score',
    {
      'volume.global.total': {
        order: 'desc',
      },
    },
  ],
});

const TopCollectionsBody = type({
  page: defaulted(number(), 0),
});

const getTopCollections = nextApiHandler<TopCollectionsResponseType>(
  async (req) => {
    const { page } = TopCollectionsBody.create(req.body);

    const topCollectionBody = getTopCollectionQuery(page);
    const [topCollectionResult] = await searchCollections([
      { body: topCollectionBody },
    ]);

    const topNFTQueries = topCollectionResult.sources.map((entry) => ({
      body: getRarestNFTsByCollectionBody(entry.id, 4),
    }));

    const nftResults = await searchNFTs(topNFTQueries);
    const results = topCollectionResult.sources
      .map((collection, idx) => ({
        collection,
        nfts: nftResults[idx].sources,
      }))
      .filter((entry) => entry.nfts.length > 0);

    return {
      results,
      total: topCollectionLimit,
      page,
    };
  }
);

export default getTopCollections;
