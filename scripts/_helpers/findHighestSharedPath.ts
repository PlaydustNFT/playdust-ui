const findHighestSharedPath = (paths: string[]): string => {
  const splitPaths = paths.map((entry) => entry.split('/'));
  const range = [...Array(splitPaths[0].length).keys()];

  const diffIdx = range.find((idx) => {
    if (idx === range.length - 1) {
      return idx;
    }

    const atIdx = splitPaths.map((entry) => entry[idx]);
    const unique = [...new Set([...atIdx])];

    return unique.length !== 1;
  });

  return splitPaths[0].slice(0, diffIdx).join('/');
};

export default findHighestSharedPath;
