import { getPostBySlug } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import CustomVideoPlayer from "@/app/lib/customVideo";
import Gallery from "@/app/lib/gallery";
import { getImageGallery, translateSlugs } from "@/app/lib/helperFunctions";
import styles from "@/app/ui/page.module.css";



// export async function generateMetadata({
//   params,
// }: {
//   params: { category: string; post: string }
// }): Promise<Metadata> {
//   return {
//     title: `${params.category} - ${params.post}`,
    
//   }
// }


export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ post: string }>
}) {
  const getPost = (await params).post;
  const post = await getPostBySlug( translateSlugs(getPost) );
  
  
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