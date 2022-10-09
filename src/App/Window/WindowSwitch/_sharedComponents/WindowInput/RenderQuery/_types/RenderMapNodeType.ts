import GroupRenderNodeType from './GroupRenderNodeType';
import GroupRenderOperatorNodeType from './GroupRenderOperatorNodeType';
import QueryRenderNodeType from './QueryRenderNodeType';

type RenderMapNodeType =
  | QueryRenderNodeType
  | GroupRenderNodeType
  | GroupRenderOperatorNodeType;

export default RenderMapNodeType;
