import type SearchQueryType from '../../../_types/SearchQueryType';
import getCollectionDependencies from './getCollectionDependencies';

const hasCollectionDependency = (
  query: SearchQueryType,
  activeNodeId: string
) => getCollectionDependencies(query, activeNodeId).length > 0;

export default hasCollectionDependency;
