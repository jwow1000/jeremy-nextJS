import client from "@/sanity/lib/client";
import { getWorksQuery, getWorkBySlugQuery, getCVQuery } from "@/sanity/lib/queries"
import {Work, Cv} from "@/../../jwy-website-studio/sanity.types";

export async function getWorks() {
  return await client.fetch<Work[]>(getWorksQuery);
}

export async function getWorkBySlug(slug: string) {
  return await client.fetch<Work>(getWorkBySlugQuery, { slug });
}

export async function getCV() {
  return await client.fetch<Cv>(getCVQuery);
}