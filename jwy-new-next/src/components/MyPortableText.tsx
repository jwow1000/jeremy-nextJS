import {
  PortableText,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const ptComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps) => {
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

export default function MyPortableText({
  content,
}: {
  content: PortableTextBlock[];
}) {
  return <PortableText value={content} components={ptComponents} />;
}
