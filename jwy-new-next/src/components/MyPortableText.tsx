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
  block: {
    normal: ({children}) => (
      <p className="text-[0.8rem] sm:text-[1rem] mb-6 leading-relaxed">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-normal my-4">{children}</h3>
    ),
    h5: ({ children }) => (
      <h5 className="text-[1rem] sm:text-[1.2rem] font-normal my-2">~{children}</h5>
    ),
  }
};

export default function MyPortableText({
  content,
}: {
  content: PortableTextBlock[];
}) {
  return <PortableText value={content} components={ptComponents} />;
}
