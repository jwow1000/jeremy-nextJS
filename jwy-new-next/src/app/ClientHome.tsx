'use client'

import { useEffect, useState } from "react";
import { Work } from "../../../jwy-website-studio/sanity.types"
import Link from "next/link";
import MyImage from "@/components/MyImage";

interface ClientHomeParams {
  works: Work[];
}

export default function ClientHome({works}: ClientHomeParams) {
  const [work, setWork] = useState<Work | null>(null);

  useEffect(() => {
    if (works && works.length > 0) {
      setWork(works[Math.floor(Math.random() * works.length)]);
    }
  }, [works]);

  return (
    <section className="w-full flex justify-center items-center">
      {
        work && (
          <Link
            href={`works/${work.slug?.current}`}
            className="relative w-64 h-64 md:w-96 md:h-96"
          >
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
        )
      }
    </section>
  )
}