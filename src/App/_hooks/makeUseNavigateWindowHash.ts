import { useRouter } from 'next/router';
import encodeWindowHash from '../_helpers/encodeWindowHash';
import getWindowHash from '../_helpers/getWindowHash';
import safePromise from '../_helpers/safePromise';
import type { WindowStateType } from '../_types/WindowStateType';

const makeUseNavigateWindowHash = (method: 'push' | 'replace') =>
  function useNavWindowHash() {
    const router = useRouter();

    return (input: WindowStateType) => {
      const encoded = encodeWindowHash(input);
      const actual = `/${getWindowHash()}`;
      const didUrlChange = encoded !== actual;

      if (didUrlChange) {
        safePromise(router[method](encoded));
      }
    };
  };

export default makeUseNavigateWindowHash;
