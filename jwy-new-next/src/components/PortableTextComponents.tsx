// components/PortableTextComponents.tsx
import Image from 'next/image'
import {PortableTextComponents} from '@portabletext/react'
import {urlFor} from '@/sanity/lib/image'

export const portableTextComponents: PortableTextComponents = {
  /* ------------------ BLOCK STYLES ------------------ */
  block: {
    normal: ({children}) => <p className="my-4 leading-relaxed">{children}</p>,

    left: ({children}) => (
      <p className="my-4 text-left">{children}</p>
    ),

    right: ({children}) => (
      <p className="my-4 text-right">{children}</p>
    ),

    center: ({children}) => (
      <p className="my-4 text-center">{children}</p>
    ),

    h1: ({children}) => (
      <h1 className="mt-10 mb-4 text-3xl font-bold">{children}</h1>
    ),

    h2: ({children}) => (
      <h2 className="mt-8 mb-3 text-2xl font-semibold">{children}</h2>
    ),

    h3: ({children}) => (
      <h3 className="mt-6 mb-2 text-xl font-semibold">{children}</h3>
    ),
  },

  /* ------------------ INLINE MARKS ------------------ */
  marks: {
    strong: ({children}) => <strong>{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    code: ({children}) => (
      <code className="rounded bg-neutral-100 px-1 py-0.5 text-sm">
        {children}
      </code>
    ),
    link: ({value, children}) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:opacity-80"
      >
        {children}
      </a>
    ),
  },

  /* ------------------ CUSTOM TYPES ------------------ */
  types: {
    /* ----- CODE BLOCK ----- */
    code: ({value}) => {
      const {code, language, filename} = value

      return (
        <figure className="my-6">
          {filename && (
            <figcaption className="mb-1 text-xs opacity-70">
              {filename}
            </figcaption>
          )}
          <pre className="overflow-x-auto rounded bg-neutral-900 p-4 text-sm text-neutral-100">
            <code className={`language-${language || 'text'}`}>
              {code}
            </code>
          </pre>
        </figure>
      )
    },

    /* ----- IMAGE EMBED ----- */
    customImage: ({value}) => {
      if (!value?.asset) return null

      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(1600).fit('max').url()}
            alt={value.alt || ''}
            width={1600}
            height={900}
            className="rounded"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm opacity-70">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    /* ----- FILE EMBED ----- */
    file: ({value}) => {
      if (!value?.asset?.url) return null

      return (
        <div className="my-6">
          <a
            href={value.asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Download file
          </a>
        </div>
      )
    },

    /* ----- VIDEO EMBED ----- */
    video: ({value}) => {
      if (!value?.url) return null

      return (
        <div className="my-6 aspect-video">
          <iframe
            src={value.url}
            className="h-full w-full rounded"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )
    },

    /* ----- AUDIO EMBED ----- */
    audio: ({value}) => {
      if (!value?.url) return null

      return (
        <div className="my-6">
          <audio controls className="w-full">
            <source src={value.url} />
          </audio>
        </div>
      )
    },
  },
}
