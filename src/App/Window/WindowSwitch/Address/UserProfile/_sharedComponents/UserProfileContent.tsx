import { CardContent, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import safePubkeyString from '../../../../../_helpers/safePubkeyString';
import PublicProfileType from '../../../../../_types/PublicProfileType';
import PlaydustProfileType from '../../../../_types/PlaydustProfileType';
import addressStateAtom from '../../../_atoms/addressStateAtom';

interface UserProfileContentProps {
  userProfile: PublicProfileType | PlaydustProfileType | null;
}

function UserProfileContent({ userProfile }: UserProfileContentProps) {
  const addressState = useRecoilValue(addressStateAtom);

  return (
    <CardContent>
      <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
        {userProfile?.username}
      </Typography>
      {addressState && addressState.pubkey && (
        <Typography sx={{ fontSize: 14, mt: 2 }}>
          {safePubkeyString(addressState.pubkey)}
        </Typography>
      )}
      <Typography sx={{ fontSize: 14, mt: 2 }}>{userProfile?.bio}</Typography>
    </CardContent>
  );
}

export default UserProfileContent;
