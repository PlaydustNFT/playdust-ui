import GroupNodeType from '../../../../_types/GroupNodeType';

type GroupRenderOperatorNodeType = {
  type: 'groupOperator';
  parent: GroupNodeType | null;
  node: GroupNodeType;
  index: number;
  inActiveBranch: boolean;
  activeDistance: number | null;
};

export default GroupRenderOperatorNodeType;
