import FileMetaType from '../_types/FileMetaType';

const validateFileContent = (files: FileMetaType[]): string[] =>
  files
    .map(({ fileNameExt, fileType, content }) => {
      const includesRecoil = content.includes("from 'recoil';");
      const includesReact =
        content.includes("from 'react';") ||
        content.includes("from '@emotion/styled';");

      switch (fileType) {
        case 'atom': {
          if (!includesRecoil) {
            return `Atom file ${fileNameExt} does not include Recoil`;
          }

          break;
        }
        case 'component': {
          if (!includesReact) {
            return `Component file ${fileNameExt} does not include React`;
          }

          break;
        }
        case 'helper':
        case 'type':
          break;
        case 'hook':
          break;
        default: {
          const n: never = fileType;

          return n;
        }
      }

      return '';
    })
    .filter((entry) => entry !== '');

export default validateFileContent;
