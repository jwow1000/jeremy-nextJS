import MyImage from "@/components/MyImage"
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
        <h1 className="text-xl mb-4">{work.title}</h1>
      }
      <div className="flex w-full flex-row gap-8">
        {
          work.type?.includes("webProject") &&
          <AppLink href="/web-design">{`back to web design <-`}</AppLink>
          
        }
        <AppLink href="/works">{`back to all works <-`}</AppLink>

      </div>
      <section className="w-full mt-10">
        {
          work.text &&
          <div className="w-full max-w-[70ch]">
            <MyPortableText content={work.text}/>
          </div>
        }
       
        {
          work.gallery &&
            <div className="relative w-full h-auto mx-auto pt-4 flex flex-col gap-4 md:flex-row">
              {
                work.gallery.images &&
                work.gallery?.images.map((image, idx) => (
                  <div key={`gallery-${idx}`} className="relative w-full aspect-[4/3]">
                    <MyImage
                      src={image}
                      alt={work.featuredImage?.alt || "no alt text available"}
                      objectFit="contain"
                    />
                  </div>
                ))
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