import FileMetaType from '../_types/FileMetaType';

const warnHelperToAtom = (files: FileMetaType[]): string[] =>
  files
    .filter((entry) => entry.fileType === 'helper')
    .map((file) => {
      const componentParents = file.importedBy.filter((parent) => {
        const found = files.find((entry) => entry.fileName === parent);

        if (!found) {
          return false;
        }

        return found.fileType === 'component';
      });

      if (componentParents.length) {
        return `helper ${
          file.fileNameExt
        } is used by components ${componentParents.join(
          ', '
        )}. Should be moved to a selector`;
      }

      return '';
    })
    .filter((entry) => entry !== '');

export default warnHelperToAtom;
