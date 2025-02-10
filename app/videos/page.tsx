import Image from "next/image";
import { getVideoPosts } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";




export default async function Videos() {
  const posts = await getVideoPosts(); // Fetch data in an async component 
  console.log("possssttss", posts[0].featuredImage.node);
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
