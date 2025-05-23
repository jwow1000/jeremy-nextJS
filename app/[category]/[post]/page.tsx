import { getPostBySlug } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import CustomVideoPlayer from "@/app/lib/customVideo";
import Gallery from "@/app/lib/gallery";
import SoundEmbed from "@/app/lib/embedSound";
import { getImageGallery, translateSlugs } from "@/app/lib/helperFunctions";
import styles from "@/app/ui/detailPage.module.css";



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
  const getPost = await params;
  const post = await getPostBySlug( translateSlugs(getPost.post) );
  
  
  const videoId = post.acfPosts.youtubeId !== "null" ? post.acfPosts.youtubeId : null;
  const customVidSrc = post.acfPosts.customVideoSource !== "null" ? post.acfPosts.customVideoSource : null;
  const webLink = post.acfPosts.webportfolioLink !== "null" ? post.acfPosts.webportfolioLink : null;  
  const sounds = post.acfPosts.soundUrl !== null ? 
    post.acfPosts.soundUrl.split(", ")
    : null;
  
  const imageGallery = getImageGallery(post.acfPosts);
  // an array of featured images
  // console.log("image gallery get", imageGallery, sounds)

  return (
    <main className={styles.main}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.acfPosts.date}</p>
        <p className={styles.description}>{post.acfPosts.description}</p>
        {webLink && (
          <a className={styles.customLink} href={webLink} target="_blank" rel="noopener norefferer ">link to website</a>
        )}
      </div>
      
      <section className={styles.imageSection}>

        <Gallery images={ imageGallery }/>
        {sounds &&
          <div className={styles.mixcloudWrapper}>
            {sounds.map((sound, idx) => (
                <SoundEmbed key={`embed-${idx}`} url={sound}/> 
            ))}
          </div>
          
        }  
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
      </section>
    </main>
  );
}