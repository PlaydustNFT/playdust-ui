import type FileMetaType from '../_types/FileMetaType';

const childDirs = ['_atoms', '_helpers', '_types', '_hooks'];

const getCorrectPath = (
  { fileName, fileType, importedDirectChildren, importedBy }: FileMetaType,
  currentDir: string
) => {
  const split = currentDir.split('/');
  const upstreamPath = split
    .filter((entry, idx) => {
      const isLastItem = idx === split.length - 1;

      if (isLastItem && childDirs.includes(entry)) {
        return false;
      }

      return true;
    })
    .join('/');

  switch (fileType) {
    case 'component': {
      const isShared = importedBy.length > 1;
      const hasChildren = importedDirectChildren.length > 0;
      const path = [
        upstreamPath,
        isShared ? '_sharedComponents' : '',
        hasChildren ? fileName : '',
        `${fileName}.tsx`,
      ]
        .filter((entry) => entry !== '')
        .join('/');

      return path;
    }
    case 'atom': {
      return `${upstreamPath}/_atoms/${fileName}.ts`;
    }
    case 'helper': {
      return `${upstreamPath}/_helpers/${fileName}.ts`;
    }
    case 'type': {
      return `${upstreamPath}/_types/${fileName}.ts`;
    }
    case 'hook': {
      return `${upstreamPath}/_hooks/${fileName}.ts`;
    }
    default: {
      const n: never = fileType;

      return n;
    }
  }
};

export default getCorrectPath;
