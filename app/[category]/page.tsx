import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory } from "@/app/lib/api/fetch";
import { Post } from "../types/postTypes";
import { PageProps } from "../types/pages";
import { Metadata } from "next";
import { getCategoryBySlug } from "@/app/lib/api/fetch";
import styles from "@/app/ui/subPage.module.css";

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params.category;
  // get category
  const post = await getCategoryBySlug( slug );
  console.log("category by slug: ", post)
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function CategoryPage({params}: PageProps) {
  let getCat = '';
  switch( params.category ) {
    case 'objects': 
      getCat = 'things';
      break;
    case 'sounds':
      getCat = 'sound';
      break;
    case 'videos':
      getCat = 'video';
      break;  
    case 'webprojects':
      getCat = 'webportfolio';
      break;
    default:
      getCat = params.category;
  }
 
  const posts = await getPostsByCategory( getCat ); // Fetch data in an async component 
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
