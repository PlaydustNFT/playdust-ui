import { array, create, string } from 'superstruct';
import type OpenSearchNFTSourceType from '../App/Window/WindowSwitch/_types/OpenSearchNFTSourceType';
import nextApiHandler from './_helpers/nextApiHandler';
import searchNFTs from './_helpers/searchNFTs';

const getMints = nextApiHandler<OpenSearchNFTSourceType[]>(async (req) => {
  const mints = create(req.body, array(string()));

  const searchBody = {
    size: mints.length,
    query: {
      ids: {
        values: mints,
      },
    },
  };

  const [{ sources }] = await searchNFTs([{ body: searchBody }]);

  return sources;
});

export default getMints;
