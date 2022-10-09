import axios from 'axios';
import { selectorFamily } from 'recoil';
import PlaydustMintAPIResponseType from '../_types/PlaydustMintAPIResponseType';

const nftByMintAtom = selectorFamily<
  PlaydustMintAPIResponseType | null,
  string
>({
  key: 'nftByMintAtom',
  get: (mintAddress) => async () => {
    if (!mintAddress) {
      return null;
    }

    const { data } = await axios.get<PlaydustMintAPIResponseType>(
      `/playdust-api/mint?mintAddress=${mintAddress}`
    );

    if (!data || !data.mintOffChainMetadata || !data.mintOnChainMetadata) {
      return null;
    }

    return data;
  },
});

export default nftByMintAtom;
