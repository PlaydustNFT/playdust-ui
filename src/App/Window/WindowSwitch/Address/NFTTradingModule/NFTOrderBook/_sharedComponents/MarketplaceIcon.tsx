import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import Link from '../../../../../_sharedComponents/Link';

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

type MarketplacePropsType = {
  alt: string;
  src: string;
  href: string;
};

const marketplaceProps: Record<string, MarketplacePropsType> = {
  MagicEdenV2: {
    alt: 'magic-eden-icon',
    src: '/me.svg',
    href: 'https://magiceden.io/item-details',
  },
};

interface MarketplaceIconProps extends ImgProps {
  marketplace: string;
  address?: string;
}

function MarketplaceIcon({
  marketplace,
  address,
  ...props
}: MarketplaceIconProps) {
  const { alt, src, href } = marketplaceProps[marketplace] ?? {};
  const image = <img height={20} alt={alt} src={src} {...props} />;

  return address ? (
    <Link href={[href, address].join('/')} target="_blank">
      {image}
    </Link>
  ) : (
    image
  );
}

export default MarketplaceIcon;
