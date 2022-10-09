import { readFileSync } from 'fs';
import type FileMetaType from '../_types/FileMetaType';
import getFileType from './getFileType';
import getImports from './getImports';

const rootDir = 'src';
const entryKey = 'App';

const getFileMeta = (paths: string[]): FileMetaType[] => {
  const base = paths.map((path) => {
    const content = readFileSync(path, { encoding: 'utf-8' });
    const fileNameExt = path.slice(path.lastIndexOf('/') + 1);
    const fileName = fileNameExt.slice(0, fileNameExt.indexOf('.'));

    return {
      path,
      isRoot: path === `${rootDir}/${entryKey}/${entryKey}.tsx`,
      fileName,
      fileNameExt,
      content,
      imports: getImports(content),
      fileType: getFileType(fileName),
      correctPath: '',
    };
  });

  const withImportedBy = base.map((entry) => {
    const importedBy = base
      .filter((y) => y.imports.includes(entry.fileName))
      .map((y) => y.fileName);

    return {
      ...entry,
      importedBy,
    };
  });

  const withDirectChildren = withImportedBy.map((entry) => {
    const importedDirectChildren = entry.imports.filter((i) => {
      const importFile = withImportedBy.find((y) => y.fileName === i);

      if (!importFile) {
        return false;
      }

      const isShared = importFile.importedBy.length > 1;

      return !isShared;
    });

    return {
      ...entry,
      importedDirectChildren,
    };
  });

  return withDirectChildren;
};

export default getFileMeta;
