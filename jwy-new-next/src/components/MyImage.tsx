"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CustomImage as CustomImageType} from "../../../jwy-website-studio/sanity.types";

type ObjectFitOption = "contain" | "cover" | "fill" | "none" | "scale-down";

type FancyImageProps = {
  src: string | StaticImageData | CustomImageType;
  alt: string;
  objectFit?: ObjectFitOption;
  className?: string;
};

export default function CustomImage({
  src,
  alt,
  objectFit = "cover",
  className,
}: FancyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const url = urlFor(src).url();
  
  return (
    <div 
      className={`
          realtive w-full h-auto 
          ${className || ""}
        `}
    >
      <Image
        src={url}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={urlFor(src).width(24).height(24).blur(10).url()}
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        className={`
          transition-opacity duration-1000 ease-in-out
          ${loaded ? "opacity-100" : "opacity-0 "}
          ${className || ""}
        `}
      />
    </div>
  );
}

