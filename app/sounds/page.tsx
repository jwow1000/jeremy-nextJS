import Image from "next/image";
import Link from "next/link";
import { Post } from "../types/postTypes";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";




export default async function Sounds() {
  const posts = await getPostsByCategory( 'sound' ); // Fetch data in an async component 
  return (
    <div className={styles.page}>
      {
        posts.map((post: Post) => {
          const img = post.featuredImage.node;
          return (
            <Link 
              key={post.id} 
              className={styles.videoPost}
              href={`/sounds/${post.slug}`}
            >
              {post.title}
              
              <Image 
                className={styles.videoThumb}
                src={img.sourceUrl}
                alt={img.altText ? img.altText : `${post.slug} thumbnail`}
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
