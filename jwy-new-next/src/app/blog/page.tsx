import { getLatestBlogPosts } from "@/sanity/lib/fetch";
import Link from "next/link";
import MyImage from "@/components/MyImage";

export default async function Blog() {
  const blogPosts = await getLatestBlogPosts(40);

  return (
    <main className="relative w-full p-4 flex flex-row justify-start">
      {blogPosts &&
        blogPosts.map((blog, idx) => {
          return (
            <div key={blog.slug?.current} className="text-[var(--nav-string)]">
              <h2 className="font-bold py-1">{`#${idx + 1} ${blog.title}`}</h2>
              <Link
                className={`
                  w-[200px] h-[200px] 
                  flex justify-center items-center
                  outline-[var(--nav-string)] outline-[1px]
                  md:hover:outline-white md:hover:outline-[1px]
                  focus:outline-white focus:outline-[1px]
                `}
                href={`blog/${blog.slug?.current}`}
              >
                <div className="relative w-full aspect-square">
                  {blog.featuredImage && (
                    <MyImage
                      src={blog.featuredImage}
                      alt={blog.featuredImage?.alt || "no alt text available"}
                      objectFit="cover"
                    />
                  )}
                </div>
              </Link>
              {blog.tags && (
                <p className="p-0">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag._id}
                      href={`blog/tag/${tag.slug?.current}`}
                      className="text-xs hover:text-white"
                    >{`#${tag?.name} `}</Link>
                  ))}
                </p>
              )}
            </div>
          );
        })}
    </main>
  );
}
