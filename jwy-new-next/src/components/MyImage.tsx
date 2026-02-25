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
  console.log("caption?", caption);
  return (
    <div className="flex flex-col justify-center w-full">
      <Image
        src={url}
        alt={alt}
        width={1200}
        height={1200}
        style={{ objectFit }}
        onLoad={() => setLoaded(true)}
        className={`
          transition-opacity duration-1000 ease-in-out
          ${loaded ? "opacity-100" : "opacity-0 "}
          ${className || ""}
        `}
      />
      {
        caption &&
        <div>
          <p>{caption}</p>
        </div>
      }
    </div>
  );
}

