import {
  PortableText,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "sanity";

const cvComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[var(--hilite)]"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed mb-3">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl sm:text-5xl font-normal tracking-tight mb-1">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-normal mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold uppercase tracking-widest mt-8 mb-2 border-b border-current">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-0">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-normal italic mb-1">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-bold mb-1">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-current pl-4 my-3 text-base italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-base">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-base">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

export default function CVPortableText({
  content,
}: {
  content: PortableTextBlock[];
}) {
  return <PortableText value={content} components={cvComponents} />;
}
