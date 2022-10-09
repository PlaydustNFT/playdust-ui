import FileMetaType from '../_types/FileMetaType';

const validateNoUnusedFiles = (files: FileMetaType[]): string[] => {
  const unusedFiles = files.filter(
    (entry) => !entry.importedBy.length && !entry.isRoot
  );

  return unusedFiles.map((file) => `${file.path} is unused`);
};

export default validateNoUnusedFiles;
