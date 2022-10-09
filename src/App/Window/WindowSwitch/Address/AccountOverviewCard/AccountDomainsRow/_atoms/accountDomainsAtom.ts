import { selector } from 'recoil';
import solanaClusterAtom from '../../../../../../_atoms/solanaClusterAtom';
import addressStateAtom from '../../../../_atoms/addressStateAtom';
import fetchUserDomains from '../_helpers/fetchUserDomains';

type AccountDomainsType = Awaited<ReturnType<typeof fetchUserDomains>>;

const accountDomainsAtom = selector<AccountDomainsType>({
  key: 'accountDomainsAtom',
  get: async ({ get }) => {
    const addressState = get(addressStateAtom);
    const solanaCluster = get(solanaClusterAtom);
    if (!addressState) {
      return [];
    }
    return fetchUserDomains(solanaCluster, addressState.pubkey);
  },
});

export default accountDomainsAtom;
