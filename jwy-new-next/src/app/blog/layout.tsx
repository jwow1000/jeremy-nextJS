import BlogLogo from "@/components/BlogLogo"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="relative w-full p-8 pl-28 pt-48 z-0">
      <div className="max-w-[1200px] mx-auto outline-[var(--nav-string)] outline-[1px]
      md:hover:outline-[var(--nav-string)] md:hover:outline-[1px]
      focus:outline-[var(--nav-string)] focus:outline-[1px]">
        <h1 className="hidden">Blog</h1>
        <div className="fixed w-[100px] h-full left-0 top-0 fill-pink flex flex-col gap-4">
          <BlogLogo className="text-[var(--nav-string)]" />
          <BlogLogo className="text-[var(--nav-string)]" />
          <BlogLogo className="text-[var(--nav-string)]" />
          <BlogLogo className="text-[var(--nav-string)]" />
          <BlogLogo className="text-[var(--nav-string)]" />
        </div>
        {children}
      </div>
    </section>
  )
}
