import React from 'react';

interface SvgIconProps {
  src: string;
  alt: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-9 h-9 transition-all duration-500 ease-in-out group-hover:filter-brightness-200 [filter:invert(60%)_sepia(98%)_saturate(1433%)_hue-rotate(359deg)_brightness(101%)_contrast(101%)] group-hover:[transform:rotateY(180deg)]"
  />
);

export default SvgIcon;
