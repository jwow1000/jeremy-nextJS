'use client'

import { Work } from "../../../jwy-website-studio/sanity.types"
import Link from "next/link";
import MyImage from "@/components/MyImage";

interface ClientHomeParams {
  works: Work[];
}

export default function ClientHome({works}: ClientHomeParams) {
  


  return (
    <section className="w-full flex md:w-3/4 flex-row flex-wrap p-0 md:pr-16 justify-around items-around">
    {
      works &&
      works.map((work) => (
          <Link 
            href={`works/${work.slug?.current}`} 
            className="relative w-32 h-32 md:w-48 h-48"
            key={`jwy-work-${work.title}`}
          >
            {/* <h2 className="mx-auto w-full">{work.title}</h2> */}
            {
              work.featuredImage &&
                <MyImage 
                  src={work.featuredImage} 
                  alt={work.featuredImage.alt || "no alt text"}
                  objectFit="contain"
                  className="w-full h-full"
                /> 
            }
          </Link>
  
      ))

    }
    </section>
  )
}