import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import { Post } from "../types/postTypes";
import { PageProps } from "../types/pages";
import { Metadata } from "next";
import { getCategoryBySlug } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";
import { translateSlugs } from "../lib/helperFunctions";

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params.category;
  // get category
  const category = await getCategoryBySlug( slug );
  console.log("category by slug: ", category, slug)
  return {
    title: category.title,
    description: category.excerpt,
  }
}

export default async function CategoryPage({params}: PageProps) {

  const category = translateSlugs(params.category);
  const posts = await getPostsByCategory(category); // Fetch data in an async component 
  // console.log("the posts", posts, params.category)
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
