export interface PageProps {
  params: {
    category: string;
    post: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}