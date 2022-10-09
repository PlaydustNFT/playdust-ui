import { exit } from 'process';
import type FileMetaType from '../_types/FileMetaType';
import findHighestSharedPath from './findHighestSharedPath';
import getCorrectPath from './getCorrectPath';
import moveToCorrectPath from './moveToCorrectPath';

interface FileMapType {
  [fileName: string]: FileMetaType;
}

const filesToMap = (files: FileMetaType[]): FileMapType =>
  files.reduce<FileMapType>(
    (acc, curr) => ({
      ...acc,
      [curr.fileName]: curr,
    }),
    {}
  );

const setCorrectPath = (
  fileMap: FileMapType,
  fileName: string,
  correctPath: string
): FileMapType => ({
  ...fileMap,
  [fileName]: {
    ...fileMap[fileName],
    correctPath,
  },
});

const placeFiles = (fileMap: FileMapType): FileMapType => {
  const readyToPlace = Object.values(fileMap)
    .filter((entry) => !entry.correctPath)
    .filter((entry) =>
      entry.importedBy.every((parent) => fileMap[parent].correctPath)
    );

  if (readyToPlace.length === 0) {
    return fileMap;
  }

  const nextFileMap = readyToPlace.reduce<FileMapType>((acc, curr) => {
    const parentPaths = curr.importedBy
      .map((entry) => fileMap[entry].correctPath)
      .filter(Boolean);

    const rootPath = findHighestSharedPath(parentPaths);
    const correctPath = getCorrectPath(curr, rootPath);

    return setCorrectPath(acc, curr.fileName, correctPath);
  }, fileMap);

  return placeFiles(nextFileMap);
};

const makeValidateStructure =
  (write: boolean) =>
  (files: FileMetaType[]): string[] => {
    const entryPoint = files.find((entry) => entry.isRoot);

    if (!entryPoint) {
      console.error('Unable to find entry point');
      exit(1);
    }

    const fileMap = filesToMap(files);
    const seededComponentMap = setCorrectPath(
      fileMap,
      entryPoint.fileName,
      entryPoint.path
    );

    const placedMap = placeFiles(seededComponentMap);
    const placedFiles = Object.values(placedMap);
    const wrong = placedFiles.filter(
      (entry) => entry.path !== entry.correctPath
    );

    if (write) {
      moveToCorrectPath(placedFiles);

      return [];
    }

    return wrong.map((entry) =>
      [
        `${entry.fileNameExt} has incorrect path`,
        `current location: ${entry.path}`,
        `correct location: ${entry.correctPath}`,
      ].join('\n')
    );
  };

export default makeValidateStructure;
