import MyImage from "@/components/MyImage"
import { urlFor } from "@/sanity/lib/image"
import AppLink from "@/components/AppLink"
import { getWorkBySlug } from "@/sanity/lib/fetch"
import YouTubeEmbed from "@/components/Youtube"
import MyPortableText from "@/components/MyPortableText"

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Get work information
  const work = await getWorkBySlug(slug)
  console.log("work: ", work)
  
  return(
    <main className="relative w-full p-4 pt-12 z-0">
      {
        work.title &&
        <h1 className="text-xl">{work.title}</h1>
      }
      <AppLink href="/works">{`back to works <-`}</AppLink>
      <section className="w-full mt-20">
        {
          work.text &&
          <div className="w-full max-w-[70ch]">
            <MyPortableText content={work.text}/>
          </div>
        }
        {
          work.gallery &&
            <div className="max-w-[600px] mx-auto">
              {
                work.gallery.images &&
                work.gallery?.images.map((image, idx) => {
                  const asset = image.asset;
                  if (!asset?._ref) return null; // skip if no asset
                  const imageUrl = urlFor(asset).width(800).url();

                  return (
                  <div key={`gallery-${idx}`} className="relative w-100% h-100% aspect-square">
                  <MyImage
                    src={imageUrl!}
                    alt={work.featuredImage?.alt || "no alt text available"}
                    objectFit="contain"
                  />
                </div>
                )})
              }
            </div>
        }
        {
          work.youtubeID &&
          <div className="max-w-[800px] mx-auto my-10">
            <YouTubeEmbed videoId={work.youtubeID} />
          </div>
        }

      </section>
    </main>
  )
}