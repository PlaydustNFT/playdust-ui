import type FileMetaType from '../_types/FileMetaType';

const warnSingleUse = (files: FileMetaType[]): string[] =>
  files
    .filter((entry) => entry.fileType === 'helper' || entry.fileType === 'type')
    .filter((entry) => entry.importedBy.length === 1)
    .map(
      (entry) =>
        `${entry.fileType} ${entry.fileNameExt} is only used by ${entry.importedBy[0]}`
    );

export default warnSingleUse;
