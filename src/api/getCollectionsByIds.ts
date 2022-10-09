import { array, string } from 'superstruct';
import OpenSearchCollectionSourceType from '../App/Window/WindowSwitch/_types/OpenSearchCollectionSourceType';
import getCollectionsByIdsBody from './_helpers/getCollectionsByIdBody';
import nextApiHandler from './_helpers/nextApiHandler';
import searchCollections from './_helpers/searchCollections';

const getCollectionsByIds = nextApiHandler<OpenSearchCollectionSourceType[]>(
  async (req) => {
    const ids = array(string()).create(req.body);
    const searchBody = getCollectionsByIdsBody(ids);

    const [results] = await searchCollections([{ body: searchBody }]);

    return results.sources;
  }
);

export default getCollectionsByIds;
