import React from "react";
import Image from "next/image";
import { FeaturedImage } from "../types/postTypes";
import styles from "@/app/ui/page.module.css";

interface GalleryProps {
  images: FeaturedImage[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className={styles.imageGalleryWrapper}>
      {images.map((image) => {
        // Handle cases where mediaDetails.sizes may be an array
        const mediaDetails = image.node.mediaDetails;
        const size = Array.isArray(mediaDetails.sizes) ? mediaDetails.sizes[0] : mediaDetails.sizes;

        return (
          <Image
            className={styles.imageGalleryItem}
            key={image.node.altText || image.node.sourceUrl} // Fallback key
            src={image.node.sourceUrl} 
            alt={image.node.altText || "Image"} // Fallback alt text
            width={size?.width || 300} // Default size if undefined
            height={size?.height || 300} 
          />
        );
      })}
    </div>
  );
};

export default Gallery;
