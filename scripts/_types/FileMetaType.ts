interface FileMetaType {
  path: string;
  fileName: string;
  fileNameExt: string;
  content: string;
  imports: string[];
  importedBy: string[];
  importedDirectChildren: string[];
  fileType: 'component' | 'atom' | 'helper' | 'hook' | 'type';
  isRoot: boolean;
  correctPath: string;
}

export default FileMetaType;
