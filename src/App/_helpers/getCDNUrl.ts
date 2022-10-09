const cdnImageSize = 300 as const;

const getCDNUrl = (original: string) =>
  `/cdn/?url=${original}&d=${cdnImageSize}x${cdnImageSize}`;

export default getCDNUrl;
