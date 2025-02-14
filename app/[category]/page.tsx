import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import { Post } from "../types/postTypes";
// import { getCategoryBySlug } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";
import { translateSlugs } from "../lib/helperFunctions";

// export async function generateMetadata({
//   params,
// }: {
//   params: { category: string; post: string }
// }): Promise<Metadata> {
//   const {category} = params;
//   // get category
//   const categoryObj = await getCategoryBySlug( category );
//   console.log("category by slug: ", categoryObj, category)
//   return {
//     title: categoryObj.name,
//     description: categoryObj.description,
//   }

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const category = (await params).category;
  const categoryTrans = translateSlugs(category);
  const posts = await getPostsByCategory(categoryTrans); // Fetch data in an async component 
  console.log("the posts", posts)
  return (
    <div className={styles.page}>
      {
        posts.map((post: Post) => {
          const img = post.featuredImage.node;
          return (
            <Link 
              key={post.id} 
              className={styles.videoPost}
              href={`/objects/${post.slug}`}
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
