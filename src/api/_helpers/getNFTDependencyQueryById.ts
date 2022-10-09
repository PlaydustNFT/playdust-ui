import { QueryDslQueryContainer } from '@opensearch-project/opensearch/api/types';
import getQueryDependencyPath from '../../App/Window/WindowSwitch/_sharedComponents/WindowInput/_helpers/getQueryDependencyPath';
import SearchQueryType from '../../App/Window/WindowSwitch/_types/SearchQueryType';
import getNFTQueryById from './getNFTQueryById';

const getNFTDependencyQueryById = (
  query: SearchQueryType,
  activeNodeId: string
): QueryDslQueryContainer => {
  const depPath = getQueryDependencyPath(query, activeNodeId);
  const queryList = depPath.map((children) =>
    children
      .filter((entry) => {
        const childNode = query.nodes[entry];

        if (childNode.type === 'group' && childNode.children.length === 0) {
          return false;
        }

        return true;
      })
      .map((entry) => getNFTQueryById(query, entry))
  );

  const flattened = queryList.reduce<QueryDslQueryContainer[]>((acc, curr) => {
    if (curr === undefined) {
      return acc;
    }

    return [...acc, ...(Array.isArray(curr) ? curr : [curr])];
  }, []);

  return {
    bool: {
      must: flattened,
    },
  };
};

export default getNFTDependencyQueryById;
