import { getCV } from "@/sanity/lib/fetch";
import MyPortableText from "@/components/MyPortableText";
import Image from "next/image";

export default async function Cv() {
  const data = await getCV();
  return (
    <main className="flex flex-col w-full p-4 pt-12 font-normal">
      <h1 className="text-xl">Jeremy Wiles-Young CV</h1>
      <section className="my-20">
        <MyPortableText content={data.body}/>

      </section>
    </main> 
  );
}
