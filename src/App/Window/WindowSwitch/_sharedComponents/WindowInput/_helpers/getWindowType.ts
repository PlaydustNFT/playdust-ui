import bs58 from 'bs58';
import type { WindowUnionType } from '../../../../../_types/WindowUnionType';

const getWindowType = (state: string): WindowUnionType => {
  if (state === '') {
    return 'home';
  }

  const num = Number(state);

  if (!Number.isNaN(num)) {
    // This is a temporary hack that will be resolved in a follow-up task
    if (num < 1000) {
      return 'epoch';
    }

    return 'block';
  }

  try {
    const decoded = bs58.decode(state);

    if (decoded.length === 32) {
      return 'address';
    }

    if (decoded.length === 64) {
      return 'tx';
    }
  } catch (e) {
    return 'search';
  }

  return 'search';
};

export default getWindowType;
