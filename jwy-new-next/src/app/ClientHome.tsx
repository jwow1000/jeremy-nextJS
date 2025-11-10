'use client'

import { Work } from "../../../jwy-website-studio/sanity.types"
import Link from "next/link";
import MyImage from "@/components/MyImage";

interface ClientHomeParams {
  works: Work[];
}
export default function ClientHome({works}: ClientHomeParams) {
  const randIdx = Math.floor(Math.random() * works.length);
  const work = works[randIdx];
      
  return (
    work &&
    <section className="w-2/3 h-full flex items-center">
      <Link href={`works/${work.slug?.current}`} className="realtive w-full my-auto flex-col">
        <h2 className="mx-auto w-98">{work.title}</h2>
        {
          work.featuredImage &&
          <div className="relative w-98 h-98 mx-auto">
            <MyImage src={work.featuredImage} alt={work.featuredImage.alt || "no alt text"}/> 
          </div>
        }
      </Link>
    </section>
  )
}