import React from 'react';
import { useRecoilValue } from 'recoil';
import useIsWallet from '../_hooks/useIsWallet';
import PrivateUserProfile from './PrivateUserProfile/PrivateUserProfile';
import PublicUserProfile from './PublicUserProfile';
import isCurrentUserAtom from './_atoms/isCurrentUserAtom';

function UserProfile() {
  const isWallet = useIsWallet();
  const isCurrentUser = useRecoilValue(isCurrentUserAtom);

  if (!isWallet && !isCurrentUser) {
    return null;
  }

  return isCurrentUser ? <PrivateUserProfile /> : <PublicUserProfile />;
}

export default UserProfile;
