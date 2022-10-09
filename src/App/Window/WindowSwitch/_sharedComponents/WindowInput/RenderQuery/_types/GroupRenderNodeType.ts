import GroupNodeType from '../../../../_types/GroupNodeType';

type GroupRenderNodeType = {
  type: 'groupStart' | 'groupEnd';
  parent: GroupNodeType | null;
  node: GroupNodeType;
  inActiveBranch: boolean;
  activeDistance: number | null;
};

export default GroupRenderNodeType;
