import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function PlaydustIcon(props: ImgProps) {
  return <img alt="playdust-icon" src="/playdust-light.svg" {...props} />;
}

export default PlaydustIcon;
