import { LocationSensorState } from 'react-use/lib/useLocation';
import { is } from 'superstruct';
import { WindowUnionType } from '../../_types/WindowUnionType';

type WindowHashType = {
  type: WindowUnionType;
  state?: string;
  tabId?: string;
};

const decodeWindowHash = (location?: LocationSensorState): WindowHashType => {
  const hash = (location?.hash || '#').slice(1);
  const decoded = decodeURIComponent(hash);
  const pairs = decoded.split('&').map((entry) => entry.split('='));
  const tabId = pairs.find(([key]) => key === 'tab')?.[1] || '';
  const [type, state] = pairs.find(([key]) => is(key, WindowUnionType)) || [
    undefined,
    '',
  ];

  if (is(type, WindowUnionType)) {
    return {
      type,
      state,
      tabId,
    };
  }

  return {
    type: 'home',
    state,
    tabId,
  };
};

export default decodeWindowHash;
