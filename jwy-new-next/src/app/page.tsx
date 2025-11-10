import AppLink from "@/components/AppLink";
import { getRandomWork } from "@/sanity/lib/fetch";
import MyImage from "@/components/MyImage";

export default async function Home() {
  const work = getRandomWork();

  return (
    <main className="flex flex-col w-full p-4 pt-12">
      <h1>Jeremy Wiles-Young</h1>
      <section className="my-20">
        <p>artist and engineer based in NYC</p>
        <div className="flex flex-row-wrap md:flex-col gap-4 py-10 w-32">
          <AppLink href={`/works`}>works</AppLink>
          <AppLink href={`/cv`} >cv</AppLink>
          <AppLink href={`/web-design`} >web design</AppLink>
          <AppLink href={`https://github.com/jwow1000`} newWindow={true}>github</AppLink>
        </div>

      </section>
      <section>
        {/* <MyImage src={}/> */}
        
      </section>
    </main> 
  );
}
