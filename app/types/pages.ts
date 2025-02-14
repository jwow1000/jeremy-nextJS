export interface PageProps {
  params: {
    category: string;
    post: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface WordPressPage {
  title: string;
  content: string;
  slug: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  // Add any other fields you need
}