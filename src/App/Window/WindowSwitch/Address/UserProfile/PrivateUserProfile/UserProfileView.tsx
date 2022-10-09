import { Button, CardActions } from '@mui/material';
import { AxiosError } from 'axios';
import React from 'react';
import { useRecoilValue } from 'recoil';
import connectedWalletAtom from '../../../../../_atoms/connectedWalletAtom';
import profileApi from '../../../../../_helpers/profileApi';
import safePromise from '../../../../../_helpers/safePromise';
import useAuth from '../../../../../_hooks/useAuth';
import useProfileState from '../../../../_hooks/useProfileState';
import PlaydustProfileType from '../../../../_types/PlaydustProfileType';
import publicProfileAtom from '../_atoms/publicProfileAtom';
import UserProfileContent from '../_sharedComponents/UserProfileContent';
import UserProfileEditorProps from './_types/UserProfileEditorProps';

const defaultProfile: PlaydustProfileType = {
  username: '',
  email: '',
  bio: '',
  discordUsername: '',
  twitterUsername: '',
  profilePictureMintAddress: '',
};

function UserProfileView({ toggleEdit }: UserProfileEditorProps) {
  const auth = useAuth();
  const connectedWallet = useRecoilValue(connectedWalletAtom);
  const publicProfile = useRecoilValue(publicProfileAtom);
  const [appProfile, setAppProfile] = useProfileState();

  const handleEdit = async () => {
    const tokens = await auth.login();

    if (tokens && !appProfile) {
      try {
        const { data } = await profileApi.get<PlaydustProfileType>('/read', {
          params: {
            walletAddress: connectedWallet,
          },
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });
        setAppProfile({ ...publicProfile, ...data });
        toggleEdit();
      } catch (e) {
        const error = e as AxiosError;
        if (error.isAxiosError && error.response?.status === 404) {
          setAppProfile(defaultProfile);
          toggleEdit();
        }
      }
    }
  };

  return (
    <>
      <UserProfileContent userProfile={appProfile || publicProfile} />
      <CardActions>
        <Button variant="contained" onClick={() => safePromise(handleEdit())}>
          Edit
        </Button>
      </CardActions>
    </>
  );
}

export default UserProfileView;
