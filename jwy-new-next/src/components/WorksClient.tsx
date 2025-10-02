"use client";

import { useState } from "react";
import MyImage from "@/components/MyImage";
import Link from "next/link";
import { Work } from "../../../jwy-website-studio/sanity.types";
import MyButton from "@/components/MyButton";
import { urlFor } from "@/sanity/lib/image";
import ScrollHorizontal from "@/components/ScrollHorizontal"

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
      <div className="w-full flex justify-between max-w-[430px]">
        <span>{`<-`}</span>
        <span>{`->`}</span>
      </div>
      <div className="w-full h-[calc(100vh-10rem)]">
        <ScrollHorizontal className="h-full gap-10 pt-1" scrollSpeed={3}>
          {filteredWorks.map((work) => {
            const asset = work.featuredImage?.asset;
            if (!asset?._ref) return null;

            const imageUrl = urlFor(asset).width(800).url();

            return (
              <Link
                key={`jwy-works-${work._id}`}
                href={`works/${work.slug?.current}`}
                className="relative h-full w-[50vh] md:w-[60vh] flex flex-col shrink-0 gap-1 md:justify-center pt-5 md:pt-0"
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
        </ScrollHorizontal>
      </div>
    </main>
  );
}
