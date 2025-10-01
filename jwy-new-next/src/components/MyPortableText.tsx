import { PortableText } from "@portabletext/react";

const ptComponents = {
  marks: {
    link: ({ value, children }: any) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--pink)]"
        >
          {`${children} ~>`}
        </a>
      );
    },
  },
};

export default function MyPortableText({ content }: { content: any }) {
  return <PortableText value={content} components={ptComponents} />;
}
