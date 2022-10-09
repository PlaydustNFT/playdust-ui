import type FileMetaType from '../_types/FileMetaType';

const getFileTypeFromParentDir = (
  parentDir: string
): FileMetaType['fileType'] => {
  if (parentDir === '_helpers') {
    return 'helper';
  }

  if (parentDir === '_atoms') {
    return 'atom';
  }

  if (parentDir === '_hooks') {
    return 'hook';
  }

  if (parentDir === '_types') {
    return 'type';
  }

  return 'component';
};

const validateCurrentLocation = (files: FileMetaType[]): string[] =>
  files
    .map((file) => {
      const split = file.path.split('/');
      const parentDir = split[split.length - 2];
      const currentLocationFileType = getFileTypeFromParentDir(parentDir);

      if (file.fileType !== currentLocationFileType) {
        return `${file.fileNameExt} has properties of a ${file.fileType} file, but is located in a ${currentLocationFileType} directory`;
      }

      return '';
    })
    .filter((entry) => entry !== '');

export default validateCurrentLocation;
