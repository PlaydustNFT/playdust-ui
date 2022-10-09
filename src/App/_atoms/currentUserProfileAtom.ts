import axios from 'axios';
import { selector } from 'recoil';
import { create } from 'superstruct';
import logger from '../_helpers/logger';
import profileApi from '../_helpers/profileApi';
import PublicProfileType from '../_types/PublicProfileType';
import connectedWalletAtom from './connectedWalletAtom';

const currentUserProfileAtom = selector<PublicProfileType | null>({
  key: 'currentUserProfileAtom',
  get: async ({ get }) => {
    const connectedWallet = get(connectedWalletAtom);
    if (!connectedWallet) {
      return null;
    }
    try {
      const { data } = await profileApi.get<PublicProfileType>('/public/read', {
        params: {
          walletAddress: connectedWallet,
        },
      });

      const publicProfile = create(data, PublicProfileType);

      return publicProfile;
    } catch (error) {
      // /public/read properly returns 404 when a user does not have a profile
      // this is common and expected w/ new users. therefore we do not log if this occurs
      if (!(axios.isAxiosError(error) && error.response?.status === 404)) {
        logger('Error while retrieving public profile', error);
      }
    }

    return null;
  },
});

export default currentUserProfileAtom;
