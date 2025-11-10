import AppLink from "@/components/AppLink";
import { getWorks } from "@/sanity/lib/fetch";
import ClientHome from "./ClientHome";

export default async function Home() {
  const works = await getWorks();

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
        <ClientHome works={works}/> 
      </div>
    </main> 
  );
}
