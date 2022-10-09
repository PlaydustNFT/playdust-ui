import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import PlaydustProfileType from '../_types/PlaydustProfileType';
import ProfileStorageType from '../_types/ProfileStorageType';
import SetProfileType from '../_types/SetProfileType';

type SyncProfileType = (profileStorage: ProfileStorageType) => void;
type ProfileState = [
  PlaydustProfileType | null,
  SetProfileType,
  SyncProfileType
];

const profileStorageAtom = atom<ProfileStorageType>({
  key: 'profileStorageAtom',
  default: {
    value: null,
    setValue: null,
  },
  dangerouslyAllowMutability: true,
});

function useProfileState(): ProfileState {
  const [profileStorage, setProfileStorage] =
    useRecoilState(profileStorageAtom);

  const syncProfile = useCallback<SyncProfileType>(
    (newProfileStorage: ProfileStorageType) => {
      profileStorage.setValue = newProfileStorage?.setValue;

      if (newProfileStorage.setValue !== profileStorage.value) {
        setProfileStorage({
          value: newProfileStorage.value,
          setValue: newProfileStorage.setValue,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setProfileStorage, profileStorage.value]
  );

  const setProfile = useCallback<SetProfileType>(
    (newProfile) => {
      if (profileStorage.setValue) {
        profileStorage.setValue(newProfile);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profileStorage.setValue]
  );

  return [profileStorage.value, setProfile, syncProfile];
}

export default useProfileState;
