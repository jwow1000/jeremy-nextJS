import { ACFPost, FeaturedImage } from "../types/postTypes";

export const getImageGallery = (post: ACFPost): FeaturedImage[] => {
  console.log("the post look for the images: ", post)
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


export function translateSlugs( slug: string ): string {
  let newSlug: string | undefined;
  switch( slug ) {
    case 'objects': 
      newSlug = 'things';
      break;
    case 'sounds':
      newSlug = 'sound';
      break;
    case 'videos':
      newSlug = 'video';
      break;  
    case 'webprojects':
      newSlug = 'webportfolio';
      break;
    default:
      newSlug = slug;
  }
  return newSlug;
}

