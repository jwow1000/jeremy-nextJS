import AppLink from "@/components/AppLink";
import { getRandomWork } from "@/sanity/lib/fetch";
import MyImage from "@/components/MyImage";
import Link from "next/link";

export default async function Home() {
  const work = await getRandomWork();

  return (
    <main className="flex flex-col w-full p-4 pt-12">
      <h1>Jeremy Wiles-Young</h1>
      <div className="flex flex-col md:flex-row mt-28 gap-16 h-[calc(100vh-200px)]">
        <section className="w-full md:w-1/3">
          <p>artist and web developer based in NYC</p>
          <div className="flex flex-row-wrap md:flex-col gap-2 md:gap-4 py-10 w-full md:w-32">
            <AppLink href={`/works`} className="w-32">works</AppLink>
            <AppLink href={`/cv`} className="w-32">cv</AppLink>
            <AppLink href={`/web-design`} className="w-32">web design</AppLink>
            <AppLink href={`https://github.com/jwow1000`} newWindow={true} className="w-32">github</AppLink>
          </div>

        </section>
        <section className="w-2/3 h-full flex items-center">
          <Link href={`works/${work.slug?.current}`} className="realtive w-full my-auto flex-col">
            <h2 className="mx-auto w-98">{work.title}</h2>
            {
              work.featuredImage &&
              <div className="relative w-98 h-98 mx-auto">
                <MyImage src={work.featuredImage} alt={work.featuredImage.alt || "no alt text"}/> 
              </div>
            }
          </Link>
        </section>

      </div>
    </main> 
  );
}
