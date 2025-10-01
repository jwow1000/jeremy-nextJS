import client from "@/sanity/lib/client";
import { getWorksQuery, getWorkBySlugQuery, getCVQuery, getAudioFilesByProjectQuery } from "@/sanity/lib/queries"
import {Work, Cv, Audio, CustomImage} from "@/../../jwy-website-studio/sanity.types";

interface AudioFileQuery {
  title: string;
  projectTitle: string;
  _id: string;
  featuredImage: CustomImage;
  description: string;
  audioUrl: string;
}

export async function getWorks() {
  return await client.fetch<Work[]>(getWorksQuery);
}

export async function getWorkBySlug(slug: string) {
  return await client.fetch<Work>(getWorkBySlugQuery, { slug });
}

export async function getCV() {
  return await client.fetch<Cv>(getCVQuery);
}

export async function getAudioFilesByProject(project: string) {
  return await client.fetch<AudioFileQuery[]>(getAudioFilesByProjectQuery, { project });
}