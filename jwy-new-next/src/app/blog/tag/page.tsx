import { getTags } from "@/sanity/lib/fetch"
import Link from "next/link"

export default async function Tags({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Get all tags
  const tags = await getTags();

  return(
    <main className="relative w-full p-4 z-0">
      <Link href={'/blog'}>{`<- All Blog Posts`}</Link>
      {
        tags &&
        tags.map((tag, idx) => (
          <Link key={`${tag._id}`} href={`/blog/tag/${tag.slug?.current}`}>
            <h1 className="text-[24px] md:text-[48px] mb-4 underline">{`#${tag.name}`}</h1>
            <p>{tag.shortDescription}</p>

          </Link>

        ))
      }
      
      
     
    </main>
  )
}