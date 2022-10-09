import { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';
import OpenSearchNFTSourceType from '../App/Window/WindowSwitch/_types/OpenSearchNFTSourceType';
import nextApiHandler from './_helpers/nextApiHandler';
import searchNFTs from './_helpers/searchNFTs';

const getMint = nextApiHandler<OpenSearchNFTSourceType>(async (req) => {
  const mintAddress = req.query.address;

  if (typeof mintAddress !== 'string') {
    throw new Error('No valid `address` supplied!');
  }

  const query: QueryDslQueryContainer = { match: { mint: mintAddress } };

  const [{ sources }] = await searchNFTs([
    {
      body: {
        query,
        size: 1,
      },
    },
  ]);

  return sources[0];
});

export default getMint;
