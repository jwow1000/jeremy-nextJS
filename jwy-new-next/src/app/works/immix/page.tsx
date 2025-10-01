import { getAudioFilesByProject } from "@/sanity/lib/fetch"
import AudioPlayer from "@/components/AudioVisualize/AudioPlayer";
import { urlFor } from "@/sanity/lib/image";

export default async function Immix() {
  const audioFiles = await getAudioFilesByProject('immix');
  console.log("immix songs", audioFiles)
  return(
    <main className="relative w-full p-4 pt-12 z-0">
      <h1 className="text-xl">Immix</h1>
      <section className="w-full mt-24">
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