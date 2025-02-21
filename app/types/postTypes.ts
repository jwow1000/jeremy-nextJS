export interface MediaSize {
  width: number;
  height: number;
}

export interface MediaDetails {
  sizes: MediaSize[] | MediaSize;
}

export interface FeaturedImage {
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
  immixLinks: string;
  
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