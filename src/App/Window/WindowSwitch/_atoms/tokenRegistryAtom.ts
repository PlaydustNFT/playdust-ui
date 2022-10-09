import type { TokenInfoMap } from '@solana/spl-token-registry';
import { selector } from 'recoil';
import fetchTokenRegistry from '../_helpers/fetchTokenRegistry';

const tokenRegistryAtom = selector<TokenInfoMap>({
  key: 'tokenRegistry',
  get: async () => fetchTokenRegistry(),
});

export default tokenRegistryAtom;
