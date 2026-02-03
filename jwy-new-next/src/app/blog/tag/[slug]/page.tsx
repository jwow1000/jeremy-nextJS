import { PortableText } from "next-sanity"
import { portableTextComponents } from "@/components/PortableTextComponents"
import { getTagBySlug, getBlogPostsByTag } from "@/sanity/lib/fetch"
import MyImage from "@/components/MyImage"
import Link from "next/link"

export default async function TagDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Get work information
  const tag = await getTagBySlug(slug);
  // get all blog posts by tag
  const posts = await getBlogPostsByTag(slug);  
  console.log("posts", posts)
  return(
    <main className="relative w-full p-4 z-0">
      <div className="flex flex-row gap-8 underline text-[var(--nav-string)]">
        <Link className="hover:text-white" href={'/blog'}>{`<- All Blog Posts`}</Link>
        <Link className="hover:text-white" href={'/blog/tag'}>{`<- Browse all tags`}</Link>
      </div>
      {
        tag.name &&
        <h1 className="text-[24px] md:text-[48px] mb-4 underline">{`#${tag.name}`}</h1>
      }
      <div>
        {
          tag.longDescription &&
          <PortableText value={tag.longDescription} components={portableTextComponents}/>
        }
      </div>
      
      <section className="w-full mt-10">
        <p>{`#${tag.name} posts `}</p>
        <div className="flex flex-row align-start">
          {
            posts &&
            posts.map((post, idx) => (
              <div key={post.slug?.current} className="text-[var(--nav-string)]">
              <h2 className="font-bold py-1">{`#${idx + 1} ${post.title}`}</h2>
              <Link
                className={`
                  w-[200px] h-[200px] 
                  flex justify-center items-center
                  outline-[var(--nav-string)] outline-[1px]
                  md:hover:outline-white md:hover:outline-[1px]
                  focus:outline-white focus:outline-[1px]
                `}
                href={`/blog/${post.slug?.current}`}
              >
                <div className="relative w-full aspect-square">
                  {post.featuredImage && (
                    <MyImage
                      src={post.featuredImage}
                      alt={post.featuredImage?.alt || "no alt text available"}
                      objectFit="cover"
                    />
                  )}
                </div>
              </Link>
              </div>
            ))
          }
        </div>
        
      </section>
    </main>
  )
}