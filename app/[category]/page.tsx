import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import { Post } from "../types/postTypes";
import { translateSlugs } from "../lib/helperFunctions";
import styles from "@/app/ui/subPage.module.css";


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const category = (await params).category;
  const categoryTrans = translateSlugs(category);
  const posts = await getPostsByCategory(categoryTrans); // Fetch data in an async component 
  // console.log("the posts", posts)
  return (
    <div className={styles.page}>
      {
        posts.map((post: Post) => {
          const img = post.featuredImage.node;
          return (
            <Link 
              key={post.id} 
              className={styles.postContainer}
              href={`/objects/${post.slug}`}
            >
              <strong>{post.title}</strong>
              <div className={styles.postDate}>{post.acfPosts.date}</div> 
              <div className={styles.postTagWrapper}>
                {
                  post.tags &&
                    post.tags.nodes.map((tag) => (
                      <div key={tag.name}className={styles.postTag}>{tag.name}</div>
                    ))
                }
              </div>
              <div className={styles.imageContainer}>
                <Image 
                  className={styles.thumb}
                  src={img.sourceUrl}
                  alt={img.altText ? img.altText : `${post.slug} thumbnail`}
                  width={Array.isArray(img.mediaDetails.sizes) ? img.mediaDetails.sizes[2]?.width : img.mediaDetails.sizes?.width}
                  height={Array.isArray(img.mediaDetails.sizes) ? img.mediaDetails.sizes[2]?.height : img.mediaDetails.sizes?.height}
                />
              </div> 



            </Link>
          )
        })
      }
    </div>
  );
}
