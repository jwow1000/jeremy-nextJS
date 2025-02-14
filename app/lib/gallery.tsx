

import React from "react";
import Image from "next/image";
import { FeaturedImage } from "../types/postTypes";
import styles from "@/app/ui/page.module.css";

// input an array of featured images
interface GalleryProps {
  images: FeaturedImage[];
}
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  
  
  return (
    <div className={styles.imageGalleryWrapper}>
      {
        images.map((image) => (
          <Image
            key={image.node.altText}
            src={image.node.sourceUrl} 
            alt={image.node.altText}
            className={styles.imageGalleryItem} 
          />
        ))
      }
    </div>
  );
};

export default Gallery;
