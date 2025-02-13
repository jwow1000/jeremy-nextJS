import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import CustomVideoPlayer from "@/app/lib/customVideo";
import Gallery from "@/app/lib/gallery";
import { getImageGallery } from "@/app/lib/helperFunctions";
import type { Metadata } from 'next';
import styles from "@/app/ui/page.module.css";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostDetailPage({
  params,
}: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  
  const videoId = post.acfPosts.youtubeId !== "null" ? post.acfPosts.youtubeId : null;
  const customVidSrc = post.acfPosts.customVideoSource !== "null" ? post.acfPosts.customVideoSource : null;
  const webLink = post.acfPosts.webportfolioLink !== "null" ? post.acfPosts.webportfolioLink : null;
  const imageGallery = getImageGallery(post.acfPosts);

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
      {customVidSrc && (
        <div className={styles.customVidWrapper}>
          <CustomVideoPlayer 
            src={customVidSrc} 
            autoplay={true}
            loop={true}
          />
        </div>
      )}
      {videoId && (
        <div className={styles.videoWrapper}>
          <YouTubeEmbed videoId={videoId} />
        </div>
      )}
    </main>
  );
}