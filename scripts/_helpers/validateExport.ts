import type FileMetaType from '../_types/FileMetaType';
import getFileType from './getFileType';

const validateExport = (files: FileMetaType[]): string[] => {
  const errors = files
    .map((file) => {
      const fileType = getFileType(file.fileName);
      const exports = file.content.match(/export \w+ \w+/g) ?? [];
      const splitExports = exports.map((exportStr) => exportStr.split(' '));

      if (fileType === 'type' && splitExports.length === 2) {
        const exportTypes = splitExports.map((exportParts) => exportParts[1]);
        if (!exportTypes.includes('const') || !exportTypes.includes('type')) {
          return `${file.path} has incorrect exports: Types should export a single 'default' or one 'type' and one 'const'`;
        }
      } else if (
        splitExports.length !== 1 ||
        splitExports[0][1] !== 'default'
      ) {
        return `${file.path} has incorrect exports: Files should have one 'default' export`;
      }

      const badlyNamedExport = splitExports.find(
        (exportParts) => exportParts[2] !== file.fileName
      );

      if (badlyNamedExport) {
        return `${
          file.path
        } has incorrect named export: ${badlyNamedExport[2].replace(';', '')}`;
      }

      return '';
    })
    .filter((entry) => entry !== '');

  return errors;
};

export default validateExport;
