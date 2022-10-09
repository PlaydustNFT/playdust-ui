import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function PlaydustLogo(props: ImgProps) {
  return <img alt="playdust-logo" src="/playdust.svg" {...props} />;
}

export default PlaydustLogo;
