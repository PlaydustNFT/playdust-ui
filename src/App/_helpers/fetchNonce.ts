import authenticationAPi from './authenticationApi';

const fetchNonce = async (publicKey: string) => {
  const { data } = await authenticationAPi.post<{ nonce: string }>('/nonce', {
    wallet: publicKey,
  });

  return data.nonce;
};

export default fetchNonce;
