export interface MediaDetails {
  sizes: { width: number; height: number }[];
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
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
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