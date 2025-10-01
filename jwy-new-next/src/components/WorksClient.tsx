"use client";

import { useState } from "react";
import MyImage from "@/components/MyImage";
import Link from "next/link";
import { Work } from "../../../jwy-website-studio/sanity.types";
import MyButton from "@/components/MyButton";
import { urlFor } from "@/sanity/lib/image";

const categories = [
  {"name": "objects", "value": "object"},
  {"name":"sounds", "value": "sound"},
  {"name":"videos", "value": "video"},
  {"name":"webprojects", "value":"webProject"},
]

export default function WorksClient({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredWorks = filter
    ? works.filter((work) => work.type === filter)
    : works;

  return (
    <main className="relative w-full p-4 pt-12 z-0">
      <h1 className="text-xl">Works</h1>
      <div className="flex gap-4 my-20 sm:my-4">
        
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
      <div className="relative w-full my-20 flex flex-col gap-12 justify-center items-center">
        {filteredWorks.map((work) => {
          const asset = work.featuredImage?.asset;
          if (!asset?._ref) return null;

          const imageUrl = urlFor(asset).width(800).url();

          return (
            <Link
              key={`jwy-works-${work._id}`}
              href={`works/${work.slug?.current}`}
              className="realtive w-full sm:w-[300px] sm:h-[300px] flex flex-col gap-1 justify-center"
            >
              <h2>{work.title}</h2>
              <div className="relative w-full aspect-square">
                <MyImage
                  src={imageUrl!}
                  alt={work.featuredImage?.alt || "no alt text available"}
                  objectFit="cover"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
