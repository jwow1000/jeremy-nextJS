

import React from "react";
import { FeaturedImage } from "../types/postTypes";
import styles from "@/app/ui/page.module.css";

// input an array of featured images
interface GalleryProps {
  images: FeaturedImage[];
}
const Gallery: React.FC<GalleryProps> = ({ images }) => {
  
  
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      {
        images.map((image) => (
          <div className={styles.imageGalleryWrapper}>
            <img 
              src={image.node.sourceUrl} 
              alt={image.node.altText}
              className={styles.imageGalleryItem} 
            />
          </div>
        ))
      }
    </div>
  );
};

export default Gallery;
