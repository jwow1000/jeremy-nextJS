import { getAudioFilesByProject, getWorkBySlug } from "@/sanity/lib/fetch"
import AudioPlayer from "@/components/AudioVisualize/AudioPlayer";
import MyPortableText from "@/components/MyPortableText";
import AppLink from "@/components/AppLink";
import { urlFor } from "@/sanity/lib/image";

export default async function Immix() {
  // Get work information
  const work = await getWorkBySlug('immix');
  console.log("work: ", work)
  const audioFiles = await getAudioFilesByProject('immix');
  // console.log("immix songs", audioFiles)
  return(
    <main className="relative w-full p-4 pt-12 z-0">
      <h1 className="text-xl">immix</h1>
      <AppLink href="/works" className="my-4">{`back to works <-`}</AppLink>
      {
        work.text &&
        <div className="w-full max-w-[70ch] pt-10">
          <MyPortableText content={work.text}/>
        </div>
      }
      <section className="w-full mt-10">
        {
          audioFiles &&
          audioFiles.map((audio) => {
            const asset = audio.featuredImage.asset;
            if (!asset?._ref) return null; // skip if no asset
            const imageUrl = urlFor(asset).width(800).url();
            return (
              <div 
                key={`immix-work-${audio.title}`}
                className="max-w-[400px] mx-auto"
              >
                <AudioPlayer 
                  audioSrc={audio.audioUrl}
                  title={audio.title}
                  imageSrc={imageUrl}
                  imageAlt={audio.featuredImage.alt}
                />
              </div>
           ) 
          })
          
        }
      </section>
    </main>
  )
}