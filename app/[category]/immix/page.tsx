import { getPostBySlug } from "@/app/lib/api/fetch";
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
interface Sound {
  title: string;
  link: string;
}


export default async function ImmixCollection() {
  const post = await getPostBySlug( 'immix' );
  console.log("looke at that", post)
  
  
  const sounds: Sound[] | null = post.acfPosts.immixLinks !== 'null' ? 
    post.acfPosts.immixLinks.split(", ").reduce<Sound[]>((acc, curr, index, array) => {
        if (index % 2 === 0) {
            acc.push({ title: curr, link: array[index + 1] || "" });
        }
        return acc;
    }, []) 
    : null;
 
  // an array of featured images

  return (
    <main className={styles.main}>
      <div className={styles.infoWrapper}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDate}>{post.acfPosts.date}</p>
        <p className={styles.description}>{post.acfPosts.description}</p>
        
      </div>
      
      <section className={styles.imageSection}>

        {sounds &&
          <div className={styles.mixcloudWrapper}>
            {sounds.map((sound, idx) => (
              <AudioPlayer 
                audioSrc={`/immix-soundfiles/${sound.link}`} 
                key={`immix-track${idx}`}
                title={sound.title}
              />
            ))}
          </div>
          
        }  
        
        
      </section>
    </main>
  );
}