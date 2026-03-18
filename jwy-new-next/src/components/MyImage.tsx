"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CustomImage as CustomImageType} from "../../../jwy-website-studio/sanity.types";

type ObjectFitOption = "contain" | "cover" | "fill" | "none" | "scale-down";

type FancyImageProps = {
  src: string | StaticImageData | CustomImageType;
  alt: string;
  caption?: string;
  objectFit?: ObjectFitOption;
  /** Applied to the outer wrapper div. Use this to control size (e.g. "w-full h-64"). */
  className?: string;
};

export default function MyImage({
  src,
  alt,
  objectFit = "cover",
  className,
  caption,
}: FancyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const url = urlFor(src).url();

  return (
    <figure className={`relative w-full h-full ${className || ""}`}>
      <Image
        src={url}
        alt={alt}
        fill
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-1000 ease-in-out ${loaded ? "opacity-100" : "opacity-0"}`}
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 text-center text-sm px-2 py-1 bg-black/40 text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

