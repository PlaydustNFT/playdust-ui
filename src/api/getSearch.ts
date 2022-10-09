import { assign, create, number, type } from 'superstruct';
import SearchResponseType from '../App/Window/WindowSwitch/Search/_types/SearchResponseType';
import SearchStateType from '../App/Window/WindowSwitch/_types/SearchStateType';
import getNFTQueryById from './_helpers/getNFTQueryById';
import nextApiHandler from './_helpers/nextApiHandler';
import searchNFTs from './_helpers/searchNFTs';

const makeGetSearchEnv = (key: string, defaultValue: number) => (): number => {
  const envVariable = process.env[key];

  if (typeof envVariable === 'number') {
    return envVariable;
  }

  return defaultValue;
};

const getInitialSearchSize = makeGetSearchEnv('SEARCH_INITIAL_SIZE', 100);
const getNextSearchSize = makeGetSearchEnv('SEARCH_NEXT_SIZE', 500);

const getSizeFrom = (page: number) => {
  const searchSize = getInitialSearchSize();
  const nextSearchSize = getNextSearchSize();

  if (page === 0) {
    return { size: searchSize, from: 0 };
  }

  const numNextBatches = page - 1;
  const from = searchSize + nextSearchSize * numNextBatches;

  return { size: nextSearchSize, from };
};

const SearchRequestType = assign(
  SearchStateType,
  type({
    page: number(),
  })
);

const getSearch = nextApiHandler<SearchResponseType>(async (req) => {
  const { query, page, onlyListed, sort } = create(req.body, SearchRequestType);
  const { size, from } = getSizeFrom(page);
  const nftQuery = getNFTQueryById(query, query.rootId);

  const [{ sources, total }] = await searchNFTs([
    {
      body: {
        query: nftQuery,
        size,
        from,
      },
      options: {
        sort,
        onlyListed,
      },
    },
  ]);

  return {
    nfts: sources,
    total,
    page,
  };
});

export default getSearch;
