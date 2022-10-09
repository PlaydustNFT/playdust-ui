import SearchQueryType from '../../../_types/SearchQueryType';
import getQueryDependencyPath from './getQueryDependencyPath';

const getCollectionDependencies = (
  query: SearchQueryType,
  activeNodeId: string
) => {
  const dependencyPath = getQueryDependencyPath(query, activeNodeId);
  const flattened = dependencyPath.flat();
  const filtered = flattened.filter((id) => {
    const node = query.nodes[id];

    return node.type === 'query' && node.field === 'collection';
  });

  return filtered;
};

export default getCollectionDependencies;
