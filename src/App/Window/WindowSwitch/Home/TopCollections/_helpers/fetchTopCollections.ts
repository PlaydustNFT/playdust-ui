import frontendApi from '../../../../_helpers/frontendApi';
import TopCollectionsResponseType from '../_types/TopCollectionsResponseType';

const fetchTopCollections = async (
  page: number
): Promise<TopCollectionsResponseType> => {
  const { data } = await frontendApi.post<TopCollectionsResponseType>(
    '/top-collections',
    {
      page,
    }
  );

  return data;
};

export default fetchTopCollections;
