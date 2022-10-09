import cookie from 'js-cookie';
import type { AtomEffect } from 'recoil';
import { create, Struct } from 'superstruct';

type StorageOptionType = 'localStorage' | 'cookie';

function makeStorageApi<StructType>(option: StorageOptionType, key: string) {
  const storageApi =
    option === 'localStorage'
      ? {
          get: () => localStorage.getItem(key),
          set: (value: StructType) =>
            localStorage.setItem(key, JSON.stringify(value)),
          remove: () => localStorage.removeItem(key),
        }
      : {
          get: () => cookie.get(key),
          set: (value: StructType) => cookie.set(key, JSON.stringify(value)),
          remove: () => cookie.remove(key),
        };

  return storageApi;
}

function persistenceEffect<StructType>(
  struct: Struct<StructType>,
  storage: StorageOptionType
): AtomEffect<StructType> {
  return ({ setSelf, onSet, trigger, node }) => {
    if (typeof window === 'undefined') {
      return;
    }
    const { key } = node;
    const { get, set, remove } = makeStorageApi(storage, key);

    try {
      const savedValue = get();

      if (trigger === 'get' && savedValue) {
        const parsed: unknown = JSON.parse(savedValue);
        const initialValue = create(parsed, struct);

        setSelf(initialValue);
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          return remove();
        }

        const nextValue = create(newValue, struct);

        set(nextValue);
      });
    } catch (e) {
      remove();
      console.error('Persistence effect error: ', e);
    }
  };
}

export default persistenceEffect;
