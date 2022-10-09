import { Avatar } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import getCDNUrl from '../../../../_helpers/getCDNUrl';
import profilePictureAtom from './_atoms/profilePictureAtom';
import publicProfileAtom from './_atoms/publicProfileAtom';
import UserProfileCard from './_sharedComponents/UserProfileCard';
import UserProfileContent from './_sharedComponents/UserProfileContent';

function PublicUserProfile() {
  const publicProfile = useRecoilValue(publicProfileAtom);
  const profilePicture = useRecoilValue(profilePictureAtom);
  const image = profilePicture?.profilePictureImage;

  return (
    <UserProfileCard
      avatar={<Avatar src={image && getCDNUrl(image)} />}
      content={<UserProfileContent userProfile={publicProfile} />}
    />
  );
}

export default PublicUserProfile;
