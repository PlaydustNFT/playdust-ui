import { atom, selector } from 'recoil';
import nftByMintAtom from '../../../_atoms/nftByMintAtom';
import publicProfileAtom from './publicProfileAtom';

type ProfilePictureData = {
  profilePictureMintAddress: string;
  profilePictureImage: string;
};

const profilePictureAtom = atom<ProfilePictureData | null>({
  key: 'profilePictureAtom',
  default: selector({
    key: 'profilePicture/default',
    get: ({ get }) => {
      const publicProfile = get(publicProfileAtom);

      if (!publicProfile) {
        return null;
      }

      if (!publicProfile.profilePictureMintAddress) {
        return null;
      }

      const data = get(nftByMintAtom(publicProfile.profilePictureMintAddress));

      if (!data) {
        return null;
      }

      return {
        profilePictureMintAddress: data.mintOnChainMetadata.mint,
        profilePictureImage: data.mintOffChainMetadata.image,
      };
    },
  }),
});

export default profilePictureAtom;
