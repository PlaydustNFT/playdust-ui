import { nullable, number, object, type } from 'superstruct';
import type SearchOverviewResponseType from '../App/Window/WindowSwitch/Search/SearchOverview/_types/SearchOverviewResponseType';
import SearchQueryType from '../App/Window/WindowSwitch/_types/SearchQueryType';
import getNFTQueryById from './_helpers/getNFTQueryById';
import nextApiHandler from './_helpers/nextApiHandler';
import searchNFTs from './_helpers/searchNFTs';

const SearchOverviewRequest = type({
  query: SearchQueryType,
});

const SearchOverviewAggType = type({
  asks: object({
    doc_count: number(),
    ceiling: object({
      value: nullable(number()),
    }),
    floor: object({
      value: nullable(number()),
    }),
    average: object({
      value: nullable(number()),
    }),
  }),
});

const getSearchOverview = nextApiHandler<SearchOverviewResponseType>(
  async (req) => {
    const { query } = SearchOverviewRequest.create(req.body);
    const nftQuery = getNFTQueryById(query, query.rootId);

    const [result] = await searchNFTs([
      {
        body: {
          query: nftQuery,
          aggregations: {
            asks: {
              nested: {
                path: 'asks',
              },
              aggs: {
                ceiling: { max: { field: 'asks.price' } },
                floor: { min: { field: 'asks.price' } },
                average: { avg: { field: 'asks.price' } },
              },
            },
          },
          size: 0,
        },
        options: {
          onlyListed: true,
        },
      },
    ]);

    const { asks } = SearchOverviewAggType.create(result.aggregations);
    const { ceiling, floor, average } = asks;

    return {
      listed: result.total,
      ceiling: ceiling.value || 0,
      floor: floor.value || 0,
      average: average.value || 0,
    };
  }
);

export default getSearchOverview;
