import { atom, selector } from 'recoil';
import { create } from 'superstruct';
import profileApi from '../../../../../_helpers/profileApi';
import PublicProfileType from '../../../../../_types/PublicProfileType';
import addressStateAtom from '../../../_atoms/addressStateAtom';

const publicProfileAtom = atom<PublicProfileType | null>({
  key: 'publicProfileAtom',
  default: selector({
    key: 'publicProfile/default',
    get: async ({ get }) => {
      const addressState = get(addressStateAtom);

      if (addressState) {
        try {
          const { data } = await profileApi.get<PublicProfileType>(
            '/public/read',
            {
              params: {
                walletAddress: addressState.pubkey.toString(),
              },
            }
          );

          return create(data, PublicProfileType);
        } catch (e) {
          // ignore
        }
      }

      return null;
    },
  }),
});

export default publicProfileAtom;
