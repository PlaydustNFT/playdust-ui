import React, { PropsWithChildren, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import currentUserProfileAtom from '../_atoms/currentUserProfileAtom';

function WhitelistGuarded({
  fallback,
  children,
}: PropsWithChildren<{ fallback: ReactNode }>) {
  const currentUserProfile = useRecoilValue(currentUserProfileAtom);

  const isWhitelisted =
    process.env.WHITELIST_ACTIVE === 'true'
      ? Boolean(currentUserProfile?.isWhitelisted)
      : false;
  const isAdmin = Boolean(currentUserProfile?.isAdmin);

  if (process.env.GO_LIVE === 'true' || isAdmin || isWhitelisted) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{fallback}</>;
}

export default WhitelistGuarded;
