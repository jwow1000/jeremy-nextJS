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