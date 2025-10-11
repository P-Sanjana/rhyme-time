import React, {FC} from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface ImageProps {
  src: StaticImport;
  alt: string;
  width: number;
  height: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const ImageComponent: FC<ImageProps> = ({ src, alt, width, height, style, onClick }) => {
  return (
    <Image src={src} width={width} height={height} style={style} alt={alt} onClick={onClick}/>
  );
};

export default ImageComponent;