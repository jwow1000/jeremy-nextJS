import { getAudioFilesByProject, getWorkBySlug } from "@/sanity/lib/fetch"
import AudioPlayer from "@/components/AudioVisualize/AudioPlayer";
import MyPortableText from "@/components/MyPortableText";
import AppLink from "@/components/AppLink";
import { urlFor } from "@/sanity/lib/image";

export default async function Soundworks() {
  // Get work information
  const work = await getWorkBySlug('soundworks');
  const audioFiles = await getAudioFilesByProject('immix');
  return(
    <main className="relative w-full p-4 pt-12 z-0">
      <h1 className="text-xl">{work?.title || "soundworks"}</h1>
      <AppLink href="/works" className="my-4">{`back to works <-`}</AppLink>
      {
        work?.text &&
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
                key={`soundworks-${audio._id}`}
                className="max-w-2xl mx-auto my-6"
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