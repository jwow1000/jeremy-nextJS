import { getPostBySlug } from "@/app/lib/api/fetch";
import YouTubeEmbed from "@/app/lib/youtube";
import CustomVideoPlayer from "@/app/lib/customVideo";
import Gallery from "@/app/lib/gallery";
import SoundEmbed from "@/app/lib/embedSound";
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
  
  
  const sounds = post.acfPosts.soundUrl !== null ? 
    post.acfPosts.soundUrl.split(", ")
    : null;
  
  const imageGallery = getImageGallery(post.acfPosts);
  // an array of featured images
  // console.log("image gallery get", imageGallery, sounds)

  return (
    <main className={styles.main}>
      <div className={styles.infoWrapper}>
        <h1 className="text-3xl font-bold white">{post.title}</h1>
        <p className="text-gray-500">{post.acfPosts.date}</p>
        <p className={styles.description}>{post.acfPosts.description}</p>
        
      </div>
      
      <section className={styles.imageSection}>

        {sounds &&
          <div className={styles.mixcloudWrapper}>
            {sounds.map((sound, idx) => (
                <SoundEmbed key={`embed-${idx}`} url={sound}/> 
            ))}
          </div>
          
        }  
        
        
      </section>
    </main>
  );
}