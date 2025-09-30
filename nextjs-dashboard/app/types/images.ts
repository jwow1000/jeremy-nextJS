export interface GalleryItem {
  node: {
    altText: string;
    sourceUrl: string;
    mediaDetails: {
      height: number;
      width: number;
    }
  }
}
export interface GalleryProps {
  images: GalleryItem[];
}