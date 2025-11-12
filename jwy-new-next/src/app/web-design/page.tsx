import { getWebWorks } from "@/sanity/lib/fetch";
import Link from "next/link";
import MyImage from "@/components/MyImage";

export default async function WebDesign() {
  const works = await getWebWorks();
  // console.log("web works: ", works);

  return (
    <main className="relative w-full p-4 pt-12 z-0 ">
      <h1 className="text-lg md:text-[45px]">Web Design + Development</h1>
      <p className="mt-16 text-lg max-w-[68ch]">
        {`I offer professional web design and development services using the
        latest tech stacks and cutting edge UI/UX design with a focus on accessibility, open-source tools, and search engine optimisation`}
        
      </p>
      <p className="my-8 italic max-w-[68ch]">
        {`Example of some tools: Next.js, Sanity.io, Tailwind CSS, Wordpress.org, Three.js, D3.js, WooCommerce, Vercel, Bare-Bones Deployment(NearlyFreeSpeech)`}
      </p>
      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col justify-center mt-16 ">
        {works &&
          works.map((work, idx) => {
            // Calculate which side this item should be on
            const isLeft = idx % 2 === 0;

            return (
              <div key={work.slug?.current}>
                {/* Render the work item */}
                <Link
                  className={`
                    w-2/3 max-w-[600px] border-white 
                    p-2 flex justify-around items-center
                    ${isLeft ? "ml-0 mr-auto" : "ml-auto mr-0"}
                    hover:outline-[var(--nav-string)] hover:outline-[1px]
                    focus:outline-[var(--nav-string)] focus:outline-[1px]
                  `}
                  href={`works/${work.slug?.current}`}
                >
                  <div className="p-4">
                    <h2 className="font-bold">{work.title}</h2>
                    <p>{work.date}</p>
                  </div>
                  <div className="relative w-full md:w-2/3 aspect-square">
                    {work.featuredImage && (
                      <MyImage
                        src={work.featuredImage}
                        alt={work.featuredImage?.alt || "no alt text available"}
                        objectFit="cover"
                      />
                    )}
                  </div>
                </Link>

                {/* Add divider if not the last item */}
                {idx < works.length - 1 && (
                  <div className="relative w-full h-26">
                    {/* Vertical line down from current item */}
                    <div
                      className={`absolute top-0 ${
                        isLeft ? "left-1/4" : "right-1/4"
                      } w-px h-1/2 bg-[var(--nav-string)]`}
                    ></div>
                    {/* Horizontal line connecting to next item */}
                    <div
                      className={`absolute top-1/2 ${
                        isLeft ? "left-1/4" : "right-1/4"
                      } w-1/2 h-px bg-[var(--nav-string)]`}
                    ></div>
                    {/* Vertical line down to next item */}
                    <div
                      className={`absolute top-1/2 ${
                        isLeft ? "right-1/4" : "left-1/4"
                      } w-px h-1/2 bg-[var(--nav-string)]`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </main>
  );
}

