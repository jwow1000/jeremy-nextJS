export interface MediaSize {
  width: number;
  height: number;
}
export interface ImmixTrack {
  internalLink: string;
}

export interface MediaDetails {
  sizes: MediaSize[] | MediaSize;
}

export interface Image {
  sourceUrl: string;
  altText: string;
  mediaDetails: MediaDetails;
}

export interface FeaturedImage {
  node: Image;
}

export interface GalleryImages {
  nodes: Image[]
}

export interface Image {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: MediaDetails;
  }; 
}

export interface ACFPost {
  date: string;
  youtubeId: string;
  description: string;
  soundcloudId: string;
  webportfolioLink: string;
  customVideoSource: string;
  imageGallery1?: FeaturedImage;
  imageGallery2?: FeaturedImage;
  imageGallery3?: FeaturedImage;
  imageGallery4?: FeaturedImage;
  soundUrl: string;
  immixInternalLink: string; 
  
}
export interface WPTag {
  id: string;
  name: string;
  slug: string;
}

export interface WPTags {
  nodes: WPTag[];
}
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: WPTags;
  featuredImage: FeaturedImage;
  acfPosts: ACFPost;
}

export interface PostResponse {
  data: {
    posts: {
      nodes: Post[];
    };
  };
}

export interface PostCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductResponse {
  data: {
    products: {
      nodes: Product[];
    }
  }
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: Image[];
  date: string;
  featuredImage: FeaturedImage;
  galleryImages: GalleryImages;
  price: string;
}