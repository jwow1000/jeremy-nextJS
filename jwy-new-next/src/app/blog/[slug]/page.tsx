import MyImage from "@/components/MyImage";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "@/components/PortableTextComponents";
import { getBlogPostBySlug } from "@/sanity/lib/fetch";
import Link from "next/link";

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Get work information
  const work = await getBlogPostBySlug(slug);
  console.log("work: ", work);

  return (
    <main className="relative w-full p-4 z-0">
      <Link className="text-[var(--nav-string)] hover:text-white" href={"/blog"}>{`<- All Blog Posts`}</Link>
      {work.tags && (
        <p className="p-0 text-[var(--nav-string)]">
          {work.tags.map((tag) => (
            <Link
              key={tag._id}
              href={`/blog/tag/${tag.slug?.current}`}
              className="text-xs hover:text-white"
            >{`#${tag?.name} `}</Link>
          ))}
        </p>
      )}
      
      {work.title && (
        <h1 className="text-[24px] md:text-[48px] mb-4 underline">
          {work.title}
        </h1>
      )}
      <div>
        {work.body && (
          <PortableText value={work.body} components={portableTextComponents} />
        )}
      </div>
      <section className="w-full mt-10">
        {work.gallery && (
          <div className="relative w-full h-auto mx-auto pt-4 flex flex-col gap-4 md:flex-col px-0 md:px-6">
            {work.gallery.images &&
              work.gallery?.images.map((image, idx) => (
                <div
                  key={`gallery-${idx}`}
                  className="relative w-full aspect-[4/3]"
                >
                  <MyImage
                    src={image}
                    alt={work.featuredImage?.alt || "no alt text available"}
                    objectFit="contain"
                  />
                </div>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
