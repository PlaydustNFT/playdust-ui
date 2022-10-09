import type FileMetaType from '../_types/FileMetaType';

const startsWithUpperCase = (input: string) =>
  input[0] === input[0].toUpperCase();

const getFileType = (fileName: string): FileMetaType['fileType'] => {
  const isUppercase = startsWithUpperCase(fileName);

  if (
    isUppercase &&
    (fileName.endsWith('Type') || fileName.endsWith('Props'))
  ) {
    return 'type';
  }

  if (fileName.endsWith('Atom')) {
    return 'atom';
  }

  if (fileName.startsWith('use') || fileName.startsWith('makeUse')) {
    return 'hook';
  }

  if (isUppercase) {
    return 'component';
  }

  return 'helper';
};

export default getFileType;
