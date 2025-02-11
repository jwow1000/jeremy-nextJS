import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import { Post } from "../types/postTypes";
import styles from "@/app/ui/subPage.module.css";




export default async function Webprojects() {
  const posts = await getPostsByCategory('webportfolio'); // Fetch data in an async component 
  console.log("possssttss", posts[0].featuredImage.node);
  return (
    <div className={styles.page}>
      {
        posts.map((post: Post) => {
          const img = post.featuredImage.node;
          return (
            <Link 
              key={post.id} 
              className={styles.videoPost}
              href={`/webprojects/${post.slug}`}
            >
              {post.title}
              
              <Image 
                className={styles.videoThumb}
                src={img.sourceUrl}
                alt={img.alt ? img.alt : `${post.slug} thumbnail`}
                width={img.mediaDetails.sizes[2].width}
                height={img.mediaDetails.sizes[2].height}
              />
            </Link>
          )
        })
      }
    </div>
  );
}
