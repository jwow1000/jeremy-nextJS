import { notFound } from "next/navigation";
import { getPostBySlug } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import type { Metadata, ResolvingMetadata } from 'next';
import styles from "@/app/ui/page.module.css";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = (await params).slug
  
    // fetch data
    const post = await getPostBySlug( slug );
  
    return {
      title: post.title,
      description: post.excerpt,
      
    }
  }

  
  export default async function PostDetailPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return notFound();
    console.log("look at post", post);
    
  return (
    <main className="container mx-auto p-4">
      <div className={styles.infoWrapper}>
        <h1 className="text-3xl font-bold white">{post.title}</h1>
        <p className="text-gray-500">date: {post.acfPosts.date}</p>
        <p className={styles.description}>{post.acfPosts.description}</p>
      </div>
      <div className={styles.videoWrapper}>
        <YouTubeEmbed 
          videoId={post.acfPosts.youtubeId}
        />
      </div>
      
    </main>
  );
}
