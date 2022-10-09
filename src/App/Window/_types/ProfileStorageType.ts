import PlaydustProfileType from './PlaydustProfileType';
import SetProfileType from './SetProfileType';

type ProfileStorageType = {
  value: PlaydustProfileType | null;
  setValue: SetProfileType | null;
};

export default ProfileStorageType;
