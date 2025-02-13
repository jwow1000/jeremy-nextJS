import { ACFPost, FeaturedImage } from "../types/postTypes";

export const getImageGallery = (post: ACFPost): FeaturedImage[] => {
  const images: FeaturedImage[] = [];

  for (let i = 1; i <= 4; i++) {
    const key = `imageGallery${i}` as keyof ACFPost;
    const image = post[key];

    if (image) {
      images.push(image as FeaturedImage);
    }
  }

  return images;
};