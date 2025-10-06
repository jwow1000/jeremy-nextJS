import MyImage from "@/components/MyImage"
import { urlFor } from "@/sanity/lib/image"
import AppLink from "@/components/AppLink"
import { getWorkBySlug } from "@/sanity/lib/fetch"
import SoundEmbed from "@/components/SoundEmbed"
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
      <AppLink href="/works" className="my-4">{`back to works <-`}</AppLink>
      <section className="w-full mt-10">
        {
          work.text &&
          <div className="w-full max-w-[70ch]">
            <MyPortableText content={work.text}/>
          </div>
        }
       
        {
          work.gallery &&
            <div className="max-w-[600px] mx-auto pt-10">
              {
                work.gallery.images &&
                work.gallery?.images.map((image, idx) => {
                  const asset = image.asset;
                  if (!asset?._ref) return null; // skip if no asset
                  const imageUrl = urlFor(asset).width(800).url();

                  return (
                  <div key={`gallery-${idx}`} className="relative w-100% aspect-5/4">
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
          work.soundLinks &&
            work.soundLinks.map((link) => (
              <div 
                key={`pspaces-mix-${link}`}
                className="w-full max-w-[70ch] mx-auto rounded-none mb-6 border-[0.5px] p-3"
              >
                <SoundEmbed url={link}/>
              </div>
            )) 
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