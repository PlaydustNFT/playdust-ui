import FileMetaType from '../_types/FileMetaType';

const validateUniqueFileNames = (files: FileMetaType[]): string[] => {
  const duplicates = files.filter(
    (file, index) =>
      files.findIndex((entry) => entry.fileName === file.fileName) !== index
  );

  return duplicates.map(
    (duplicate) => `Duplicate file name found ${duplicate.path}`
  );
};

export default validateUniqueFileNames;
