import AppLink from "@/components/AppLink";
import { getWorks } from "@/sanity/lib/fetch";
import ClientHome from "./ClientHome";

export default async function Home() {
  const works = await getWorks();

  return (
    <main className="flex flex-col w-full min-h-dvh p-4 pt-12">
      <h1>Jeremy Wiles-Young</h1>
      <div className="relative w-full flex-1 mt-14 md:mt-28">
        <section className="w-full md:w-1/4 md:absolute md:top-0 md:left-0">
          <p>artist, av systems engineer, and web developer based in NYC</p>
          <div className="flex flex-row-wrap md:flex-col gap-2 md:gap-4 py-10 w-full md:w-32">
            <AppLink href={`/works`} className="w-32">works</AppLink>
            <AppLink href={`/cv`} className="w-32">cv</AppLink>
            <AppLink href={`/web-design`} className="w-32">web design</AppLink>
            <AppLink href={`/blog`} className="w-32">blog</AppLink>
            <AppLink href={`https://github.com/jwow1000`} newWindow={true} className="w-32">github</AppLink>
          </div>
        </section>
        <div className="w-full h-full flex justify-center items-center">
          <ClientHome works={works}/>
        </div>
      </div>
    </main>
  );
}
