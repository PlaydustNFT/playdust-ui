import {
  AccountCircle,
  AlternateEmail,
  Mail,
  SvgIconComponent,
} from '@mui/icons-material';
import {
  Button,
  CardActions,
  CardContent,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import connectedWalletAtom from '../../../../../_atoms/connectedWalletAtom';
import profileApi from '../../../../../_helpers/profileApi';
import safePromise from '../../../../../_helpers/safePromise';
import useAuth from '../../../../../_hooks/useAuth';
import PublicProfileType from '../../../../../_types/PublicProfileType';
import useProfileState from '../../../../_hooks/useProfileState';
import PlaydustProfileType from '../../../../_types/PlaydustProfileType';
import profilePictureAtom from '../_atoms/profilePictureAtom';
import publicProfileAtom from '../_atoms/publicProfileAtom';
import UserProfileEditorProps from './_types/UserProfileEditorProps';

type FormFieldProps = Omit<TextFieldProps, 'name'> & {
  name: keyof PlaydustProfileType;
  Icon?: SvgIconComponent;
  validator?: (value: string) => boolean;
};

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const twitterRegex = /^[a-zA-Z0-9_]{1,15}$/;

const formFields: FormFieldProps[] = [
  {
    name: 'username',
    placeholder: 'Username',
    required: true,
  },
  {
    name: 'email',
    placeholder: 'Email',
    required: true,
    Icon: Mail,
    validator: (value) => emailRegex.test(value),
  },
  {
    name: 'bio',
    placeholder: 'Bio',
    multiline: true,
  },
  {
    name: 'discordUsername',
    placeholder: 'Discord',
    Icon: AccountCircle,
  },
  {
    name: 'twitterUsername',
    placeholder: 'Twitter',
    Icon: AlternateEmail,
    validator: (value) => twitterRegex.test(value),
  },
];

const profileKeys: FormFieldProps['name'][] = [
  ...formFields.map(({ name }) => name),
  'profilePictureMintAddress',
];

function UserProfileEdit({ toggleEdit }: UserProfileEditorProps) {
  const auth = useAuth();
  const connectedWallet = useRecoilValue(connectedWalletAtom);
  const [publicProfile, setPublicProfile] = useRecoilState(publicProfileAtom);
  const profilePicture = useRecoilValue(profilePictureAtom);
  const resetProfilePicture = useResetRecoilState(profilePictureAtom);
  const [appProfile, setAppProfile] = useProfileState();
  const [formState, setFormState] = useState<PlaydustProfileType | null>(
    appProfile
  );

  if (!formState || !appProfile) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormState(
      (prev) =>
        prev && {
          ...prev,
          [event.target.name]: event.target.value,
        }
    );

  const handleSave = async () => {
    const newValue = { ...formState, ...profilePicture };

    const hasChanges = profileKeys.some(
      (key) => newValue[key] !== appProfile[key]
    );

    if (!hasChanges) {
      return toggleEdit();
    }

    const tokens = await auth.login();

    if (tokens && connectedWallet) {
      const { profilePictureImage, ...data } = newValue;
      await profileApi.post(`/update/${connectedWallet}`, data, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const { data: newPublicProfile } =
        await profileApi.get<PublicProfileType>('/public/read', {
          params: {
            walletAddress: connectedWallet,
          },
        });
      setAppProfile(newValue);
      setPublicProfile(newPublicProfile);
      toggleEdit();
    }
  };

  const invalidFields = formFields
    .filter(({ name, required, validator }) => {
      const value = formState[name] ?? '';

      if (required && !value) {
        return true;
      }

      if (value && validator && !validator(value)) {
        return true;
      }

      return false;
    })
    .map(({ name }) => name);

  return (
    <>
      <CardContent>
        {formFields.map(({ Icon, validator, ...props }: FormFieldProps) => {
          const value = formState[props.name] ?? '';
          const errorText =
            (validator || props.required) && invalidFields.includes(props.name)
              ? `${props.placeholder || props.name} is ${
                  props.required && !value ? 'required' : 'invalid'
                }`
              : '';

          return (
            <TextField
              {...props}
              key={props.name}
              sx={{ ...props.sx, mt: 1, mb: 1 }}
              error={!!errorText}
              helperText={errorText}
              size="small"
              label={props.placeholder}
              value={value}
              onChange={handleChange}
              InputProps={{
                startAdornment: Icon && (
                  <InputAdornment sx={{ mt: -0.5 }} position="start">
                    <Icon />
                  </InputAdornment>
                ),
              }}
            />
          );
        })}
      </CardContent>
      <CardActions>
        <Button
          disabled={!!invalidFields.length}
          variant="contained"
          onClick={() => safePromise(handleSave())}
        >
          Save
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            toggleEdit();
            resetProfilePicture();
          }}
        >
          Cancel
        </Button>
      </CardActions>
    </>
  );
}

export default UserProfileEdit;
