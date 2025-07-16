import { getPostBySlug, getImmixTracks } from "@/app/lib/api/fetch";
import AudioPlayer from "@/app/lib/audioPlayer";
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

export default async function ImmixCollection() {
  const post = await getPostBySlug( 'immix' );
  const tracks = await getImmixTracks();
  console.log("looke at that", tracks)

  return (
    <main className={styles.main}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        {/* <p className={styles.postDate}>{formatDate(post.acfPosts.date)}</p> */}
        <p className={styles.description}>{post.acfPosts.description}</p>
        
      </div>
      
      <section className={styles.imageSection}>

        {tracks &&
          <div className={styles.mixcloudWrapper}>
            
            {tracks.map((track, idx) => (
              <AudioPlayer 
                audioSrc={`/audio/immix-soundfiles/${track.acfPosts.immixInternalLink}`} 
                imageAlt={track.featuredImage.node.altText}
                imageSrc={track.featuredImage.node.sourceUrl}
                key={`immix-track${idx}`}
                title={track.title}
              />
            ))}
          </div>
          
        }  
        
        
      </section>
    </main>
  );
}