import { outputFileSync, removeSync } from 'fs-extra';
import { relative } from 'path';
import type FileMetaType from '../_types/FileMetaType';

const delimiter = ';\n';

const getRelativePath = (from: string, to: string) => {
  const relativePath = relative(from, to);
  const withoutExtension = relativePath.slice(0, relativePath.lastIndexOf('.'));

  if (relativePath.startsWith('../.')) {
    return withoutExtension.slice(3);
  }

  if (relativePath.startsWith('../')) {
    return withoutExtension.slice(1);
  }

  return withoutExtension;
};

const moveToCorrectPath = (allFiles: FileMetaType[]) =>
  allFiles.forEach((file) => {
    const newFileContent = file.content
      .split(delimiter)
      .map<string>((line) => {
        if (!line.startsWith('import')) {
          return line;
        }

        const startIdx = line.indexOf("'") + 1;
        const importPath = line.slice(startIdx, -1);

        if (importPath.startsWith('.')) {
          const importName = importPath.slice(importPath.lastIndexOf('/') + 1);
          const importFile = allFiles.find(
            (entry) => entry.fileName === importName
          );

          if (!importFile) {
            return line;
          }

          const relativePath = getRelativePath(
            file.correctPath,
            importFile.correctPath
          );

          return `${line.slice(0, line.indexOf("'"))}'${relativePath}'`;
        }

        return line;
      })
      .join(delimiter);

    if (file.path !== file.correctPath) {
      removeSync(file.path);
    }
    outputFileSync(file.correctPath, newFileContent);
  });

export default moveToCorrectPath;
