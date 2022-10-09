import type FileMetaType from '../_types/FileMetaType';

const validateNoCircularDeps = (files: FileMetaType[]): string[] => {
  const errors = files
    .map((file) => {
      const circularDeps = file.importedBy.filter((entry) =>
        file.imports.includes(entry)
      );

      return {
        ...file,
        circularDeps,
      };
    })
    .filter((entry) => entry.circularDeps.length > 0);

  return errors.map(
    (entry) =>
      `${
        entry.fileNameExt
      } has circular dependencies from ${entry.circularDeps.join(', ')}`
  );
};

export default validateNoCircularDeps;
