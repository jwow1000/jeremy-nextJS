"use client";

import { useState } from "react";
import MyImage from "@/components/MyImage";
import Link from "next/link";
import { Work } from "../../../jwy-website-studio/sanity.types";
import MyButton from "@/components/MyButton";

const categories = [
  {"name": "objects", "value": "object"},
  {"name":"sounds", "value": "sound"},
  {"name":"videos", "value": "video"},
]

export default function WorksClient({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredWorks = filter
    ? works.filter((work) => work.type?.includes(filter))
    : works;

  return (
    <main className="relative w-full min-h-dvh px-2 md:px-4 pt-12 pb-12 z-0">
      <h1 className="text-xl">Works</h1>
      <div className="flex gap-4 mt-14 sm:my-4">
        {categories.map((cat) => (
          <MyButton
            key={cat.value}
            state={filter === cat.value}
            onClick={() => setFilter(filter === cat.value ? null : cat.value)}
          >
            {cat.name}
          </MyButton>
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-10 mt-8">
        {filteredWorks.map((work) => {

          return (
            <Link
              key={`jwy-works-${work._id}`}
              href={`works/${work.slug?.current}`}
              className="relative flex flex-col gap-1 hover:text-[var(--hilite)] w-[calc(50%-1.25rem)] md:w-[calc(25%-1.875rem)]"
            >
              <div className="relative w-full aspect-square border border-[0.5px] flex justify-center overflow-hidden">
                {
                  work.featuredImage &&
                  <MyImage
                    src={work.featuredImage}
                    alt={work.featuredImage?.alt || "no alt text available"}
                    objectFit="cover"
                  />
                }
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
