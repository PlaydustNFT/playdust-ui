import GroupNodeType from '../../../../_types/GroupNodeType';
import QueryNodeType from '../../../../_types/QueryNodeType';

type QueryRenderNodeType = {
  type: 'query';
  parent: GroupNodeType;
  node: QueryNodeType;
  inActiveBranch: boolean;
  activeDistance: number | null;
};

export default QueryRenderNodeType;
