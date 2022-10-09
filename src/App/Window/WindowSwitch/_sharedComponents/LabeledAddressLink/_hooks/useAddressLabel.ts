import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import solanaClusterAtom from '../../../../../_atoms/solanaClusterAtom';
import tokenRegistryAtom from '../../../_atoms/tokenRegistryAtom';
import addressLabel from '../../../_helpers/addressLabel';

function useAddressLabel() {
  const solanaCluster = useRecoilValue(solanaClusterAtom);
  const tokenRegistry = useRecoilValue(tokenRegistryAtom);

  const getAddressLabel = useCallback(
    (address: string) =>
      addressLabel(address, solanaCluster.network, tokenRegistry),
    [solanaCluster, tokenRegistry]
  );

  return getAddressLabel;
}

export default useAddressLabel;
