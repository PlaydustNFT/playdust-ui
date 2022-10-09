import React, { useState } from 'react';
import UserProfileCard from '../_sharedComponents/UserProfileCard';
import UserProfileEdit from './UserProfileEdit';
import UserProfileImage from './UserProfileImage';
import UserProfileView from './UserProfileView';

function PrivateUserProfile() {
  const [edit, setEdit] = useState(false);

  const editorProps = {
    edit,
    toggleEdit: () => setEdit((prev) => !prev),
  };

  return (
    <UserProfileCard
      avatar={<UserProfileImage {...editorProps} />}
      content={
        !edit ? (
          <UserProfileView {...editorProps} />
        ) : (
          <UserProfileEdit {...editorProps} />
        )
      }
    />
  );
}

export default PrivateUserProfile;
