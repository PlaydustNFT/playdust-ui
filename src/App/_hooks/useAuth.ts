import { useWallet } from '@solana/wallet-adapter-react';
import base58 from 'bs58';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { create, Infer, object, string } from 'superstruct';
import connectedWalletAtom from '../_atoms/connectedWalletAtom';
import authenticationApi from '../_helpers/authenticationApi';
import fetchNonce from '../_helpers/fetchNonce';

type LoginResponseType = Infer<typeof LoginResponseType>;
const LoginResponseType = object({
  accessToken: string(),
});

const validateAuthToken = (input: string | undefined) => {
  if (!input) {
    return null;
  }

  try {
    const parsedInput: unknown = JSON.parse(input);
    const tokens = create(parsedInput, LoginResponseType);

    return tokens;
  } catch {
    return null;
  }
};

const isJWTExpired = (token: string | undefined): boolean => {
  if (token === undefined) {
    return true;
  }

  try {
    const bufferString = Buffer.from(token.split('.')[1], 'base64').toString();
    const parsed = JSON.parse(bufferString) as { exp: number };

    return Date.now() >= parsed.exp * 1000;
  } catch {
    return true;
  }
};

const cookieKey = 'userAuthAtomCookie';

const cookieApi = {
  get: () => Cookies.get(cookieKey),
  set: (value: LoginResponseType) =>
    Cookies.set(cookieKey, JSON.stringify(value)),
  remove: () => Cookies.remove(cookieKey),
};

function useAuth() {
  const wallet = useWallet();
  const router = useRouter();
  const connectedWallet = useRecoilValue(connectedWalletAtom);

  return {
    login: async () => {
      const cookieString = cookieApi.get();
      const tokens = validateAuthToken(cookieString);
      const { accessToken } = tokens || {};
      const isAccessTokenValid = !isJWTExpired(accessToken);

      if (isAccessTokenValid) {
        return tokens;
      }

      if (wallet.signMessage && connectedWallet) {
        const nonce = await fetchNonce(connectedWallet);
        const nonceMessage = new TextEncoder().encode(nonce);
        const messageArray = await wallet.signMessage(nonceMessage);
        const message = base58.encode(messageArray);

        const { data } = await authenticationApi.post<LoginResponseType>(
          '/login',
          {
            nonce,
            message,
            wallet: connectedWallet,
          }
        );

        cookieApi.set(data);

        return data;
      }

      return null;
    },

    logout: async () => {
      const cookieString = cookieApi.get();
      const tokens = validateAuthToken(cookieString);

      await wallet.disconnect();

      if (tokens) {
        cookieApi.remove();
        router.reload();
      }
    },
  };
}

export default useAuth;
