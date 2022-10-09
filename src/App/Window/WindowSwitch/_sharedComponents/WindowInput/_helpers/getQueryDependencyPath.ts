import type SearchQueryType from '../../../_types/SearchQueryType';

const makeGetPathFromRoot = (query: SearchQueryType) => {
  const nodeList = Object.values(query.nodes);

  function getPathFromRoot(paths: string[], currId: string): string[] {
    if (currId === query.rootId) {
      return [query.rootId, ...paths];
    }

    const found = nodeList.find(
      (entry) => entry.type === 'group' && entry.children.includes(currId)
    );

    if (!found) {
      return paths;
    }

    return [...getPathFromRoot(paths, found.id), currId];
  }

  return getPathFromRoot;
};

const getQueryDependencyPath = (
  query: SearchQueryType,
  activeNodeId: string
): string[][] => {
  const pathToActive = makeGetPathFromRoot(query)([], activeNodeId);

  const childrenList = pathToActive.map((currId, idx) => {
    const currNode = query.nodes[currId];
    const isGroup = currNode.type === 'group';
    const isOrGroup = isGroup && currNode.operator === 'or';
    const isLast = idx === pathToActive.length - 1;

    if (!isGroup || isOrGroup) {
      return undefined;
    }

    const filteredChildren = isLast
      ? currNode.children
      : currNode.children.filter((childId) => !pathToActive.includes(childId));

    return filteredChildren;
  });

  return childrenList.reduce<string[][]>((acc, curr) => {
    if (curr && curr.length > 0) {
      return [...acc, curr];
    }

    return acc;
  }, []);
};

export default getQueryDependencyPath;
