import GroupNodeType from '../_types/GroupNodeType';
import SearchQueryType from '../_types/SearchQueryType';

function flattenNodes(nodes: SearchQueryType['nodes'], id: string): string[] {
  const node = nodes[id];

  if (node.type !== 'group') {
    return [node.id];
  }

  const nextList = [
    node.id,
    ...node.children.flatMap((childId) => flattenNodes(nodes, childId)),
  ];

  return nextList;
}

const idsMatchQueryKeys = (query: SearchQueryType) => {
  const entries = Object.entries(query.nodes);
  const matches = entries.every(([key, node]) => node.id === key);

  return matches;
};

const validateSearchQuery = (query: SearchQueryType): boolean => {
  if (query?.rootId === '' && Object.keys(query.nodes).length === 0) {
    return true;
  }

  if (!SearchQueryType.is(query)) {
    return false;
  }

  if (!GroupNodeType.is(query.nodes[query.rootId])) {
    return false;
  }

  const hasMatchedIds = idsMatchQueryKeys(query);

  if (!hasMatchedIds) {
    return false;
  }

  const flattened = flattenNodes(query.nodes, query.rootId).sort().join();
  const values = Object.keys(query.nodes).sort().join();
  const hasValidPath = flattened === values;

  return hasValidPath;
};

export default validateSearchQuery;
