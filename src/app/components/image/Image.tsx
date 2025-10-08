import React, {FC} from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  style?: React.CSSProperties;
}

const ImageComponent: FC<ImageProps> = ({ src, style }) => {
  return (
    <Image src={src} style={style} alt="Image"/>
  );
};

export default ImageComponent;