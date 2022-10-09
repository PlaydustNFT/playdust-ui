import type { WindowStateType } from '../_types/WindowStateType';

const encodeWindowHash = (input: WindowStateType): string => {
  if (input.type === 'home') {
    return `/#tab=${input.tabId}`;
  }

  const base = `/#${input.type}=${encodeURIComponent(input.state)}`;

  return `${base}&tab=${input.tabId}`;
};

export default encodeWindowHash;
