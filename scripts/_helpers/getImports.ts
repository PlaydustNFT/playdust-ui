import temporaryExcludes from './temporaryExcludes';

const getImports = (content: string): string[] => {
  if (!content.includes('import')) {
    return [];
  }

  const imports = content
    .split('import')
    .map((line) => {
      const startIdx = line.indexOf("'") + 1;
      const endIdx = line.indexOf("';");

      return line.slice(startIdx, endIdx);
    })
    .filter((line) => line.startsWith('.'))
    .filter((line) =>
      temporaryExcludes.externalPaths.every(
        (exclude) => !line.includes(exclude)
      )
    )
    .map((line) => line.slice(line.lastIndexOf('/') + 1));

  return imports;
};

export default getImports;
