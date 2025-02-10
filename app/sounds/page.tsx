import Image from "next/image";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";




export default async function Sounds() {
  const posts = await getPostsByCategory( 'sound' ); // Fetch data in an async component 
  return (
    <div className={styles.page}>
      {
        posts.map((post: any) => {
          const img = post.featuredImage.node;
          return (
            <div key={post.id} className={styles.videoPost}>
              {post.title}
              
              <Image 
                className={styles.videoThumb}
                src={img.sourceUrl}
                alt={img.alt}
                width={img.mediaDetails.sizes[2].width}
                height={img.mediaDetails.sizes[2].height}
              />
            </div>
          )
        })
      }
    </div>
  );
}
