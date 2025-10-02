'use client'
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

type ObjectFitOption = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

type FancyImageProps = {
  src: string | StaticImageData;
  alt: string;
  objectFit?: ObjectFitOption; 
}

export default function MyImage({ src, alt, objectFit='cover' }: FancyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`}
      style={{ objectFit: objectFit, objectPosition: 'center',  }}
      className={`fade-in ${loaded ? 'loaded' : ''}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
