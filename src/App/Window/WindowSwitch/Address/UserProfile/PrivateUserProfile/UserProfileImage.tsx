import { Close } from '@mui/icons-material';
import { Avatar, ButtonBase, Fab, ImageList, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import getCDNUrl from '../../../../../_helpers/getCDNUrl';
import SuspenseBoundary from '../../../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import useProfileState from '../../../../_hooks/useProfileState';
import CardImageContainer from '../../../_sharedComponents/CardImageContainer';
import OpenSearchNFTSourceType from '../../../_types/OpenSearchNFTSourceType';
import nftsForAddressAtom from '../../_atoms/nftsForAddressAtom';
import profilePictureAtom from '../_atoms/profilePictureAtom';
import UserProfileEditorProps from './_types/UserProfileEditorProps';

const imageSize = 100;
const columns = 2;
const maxRows = 4;
const height = imageSize * maxRows;

const imageListStyle = {
  width: 'inherit',
  height,
  maxHeight: height,
};

interface ImageSelectProps {
  onChange: (nft: OpenSearchNFTSourceType) => void;
}

function ImageSelect({ onChange }: ImageSelectProps) {
  const nfts = useRecoilValue(nftsForAddressAtom);

  if (!nfts.length) {
    return <i>No NFTs found...</i>;
  }

  return (
    <ImageList sx={imageListStyle} gap={0} cols={columns} rowHeight={imageSize}>
      {nfts.map((nft) => (
        <ButtonBase key={nft.mint} onClick={() => onChange(nft)}>
          <CardImageContainer
            src={getCDNUrl(nft.image)}
            imageSize={imageSize}
            overlay={null}
          />
        </ButtonBase>
      ))}
    </ImageList>
  );
}

function useProfileImage() {
  const [appProfile] = useProfileState();
  const [profilePicture, setProfilePicture] =
    useRecoilState(profilePictureAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (appProfile?.profilePictureImage) {
      const { profilePictureMintAddress, profilePictureImage } = appProfile;
      setProfilePicture({ profilePictureMintAddress, profilePictureImage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const image = profilePicture?.profilePictureImage;

  return {
    src: image && getCDNUrl(image),
    open,
    toggleOpen: () => setOpen((prev) => !prev),
    onChange: (nft: OpenSearchNFTSourceType) => {
      setProfilePicture({
        profilePictureMintAddress: nft.mint,
        profilePictureImage: nft.image,
      });
      setOpen(false);
    },
  };
}

function ImageEdit() {
  const { src, open, toggleOpen, onChange } = useProfileImage();

  return !open ? (
    <ButtonBase onClick={toggleOpen}>
      <Avatar src={src} />
    </ButtonBase>
  ) : (
    <SuspenseBoundary
      error={null}
      loading={
        <Skeleton sx={imageListStyle} animation="wave" variant="rectangular" />
      }
      content={
        <>
          <ImageSelect onChange={onChange} />
          <Fab size="small" onClick={toggleOpen}>
            <Close />
          </Fab>
        </>
      }
    />
  );
}

function ImageView() {
  const { src } = useProfileImage();

  return <Avatar src={src} />;
}

function UserProfileImage(props: UserProfileEditorProps) {
  return !props.edit ? <ImageView /> : <ImageEdit />;
}

export default UserProfileImage;
