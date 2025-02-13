// app/[category]/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import CustomVideoPlayer from "@/app/lib/customVideo";
import Gallery from "@/app/lib/gallery";
import { getImageGallery } from "@/app/lib/helperFunctions";
import type { Metadata } from 'next';
import styles from "@/app/ui/page.module.css";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Validate category to prevent invalid routes
const validCategories = ['sounds', 'videos', 'objects', 'webprojects'];

export async function generateStaticParams() {
  // You'll need to implement getAllPosts to return category with each post
  const posts = await getPosts();
  
  return posts.map((post) => ({
    category: post.category.toLowerCase(),
    slug: post.slug,
  }));  
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { category, slug } = params;
  
  if (!validCategories.includes(category.toLowerCase())) {
    return notFound();
  }
  
  const post = await getPostBySlug(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostDetailPage({
  params,
}: PageProps) {
  const { category, slug } = params;
  
  // Validate category
  if (!validCategories.includes(category.toLowerCase())) {
    return notFound();
  }
  
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  
  const videoId = post.acfPosts.youtubeId !== "null" ? post.acfPosts.youtubeId : null;
  const customVidSrc = post.acfPosts.customVideoSource !== "null" ? post.acfPosts.customVideoSource : null;
  const webLink = post.acfPosts.webportfolioLink !== "null" ? post.acfPosts.webportfolioLink : null;
  const imageGallery = getImageGallery(post.acfPosts);

  // You can conditionally render different components based on category
  const renderCategorySpecificContent = () => {
    switch(category.toLowerCase()) {
      case 'sounds':
        return <div>Sound-specific components here</div>;
      case 'videos':
        return (
          <>
            {videoId && (
              <div className={styles.videoWrapper}>
                <YouTubeEmbed videoId={videoId} />
              </div>
            )}
            {customVidSrc && (
              <div className={styles.customVidWrapper}>
                <CustomVideoPlayer 
                  src={customVidSrc} 
                  autoplay={true}
                  loop={true}
                />
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className={styles.infoWrapper}>
        <h1 className="text-3xl font-bold white">{post.title}</h1>
        <p className="text-gray-500">{post.acfPosts.date}</p>
        <p className={styles.description}>{post.acfPosts.description}</p>
        {webLink && (
          <a className={styles.customLink} href={webLink}>link to website</a>
        )}
      </div>
      
      <Gallery images={imageGallery}/>
      {renderCategorySpecificContent()}
    </main>
  );
}