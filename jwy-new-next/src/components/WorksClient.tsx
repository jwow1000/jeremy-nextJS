"use client";

import { useState } from "react";
import MyImage from "@/components/MyImage";
import Link from "next/link";
import { Work } from "../../../jwy-website-studio/sanity.types";
import MyButton from "@/components/MyButton";
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
    ? works.filter((work) => work.type?.includes(filter))
    : works;

  return (
    <main className="relative w-full h-dvh px-2 md:px-4 pt-12 z-0">
      <h1 className="text-xl h-[10%]">Works</h1>
      <div className="w-full h-[10%]">
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

      </div>
      <div className="w-full h-[80%]">
        <ScrollHorizontal className="h-full gap-10 md:pb-8" scrollSpeed={3}>
          {filteredWorks.map((work) => {

            return (
              <Link
                key={`jwy-works-${work._id}`}
                href={`works/${work.slug?.current}`}
                className="relative h-full w-[40vh] md:w-[60vh] flex flex-col shrink-0 gap-1 md:justify-center pt-5 md:pt-0 hover:text-[var(--pink)]"
              >
                <h2>{work.title}</h2>
                <div className="relative w-full aspect-square border border-[0.5px]">
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
        </ScrollHorizontal>
      </div>
    </main>
  );
}
