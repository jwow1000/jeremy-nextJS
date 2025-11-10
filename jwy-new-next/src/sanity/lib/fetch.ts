import client from "@/sanity/lib/client";
import { getWorksQuery, getWorkBySlugQuery, getCVQuery, getAudioFilesByProjectQuery, getWebWorksQuery } from "@/sanity/lib/queries"
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

export async function getWebWorks() {
  return await client.fetch<Work[]>(getWebWorksQuery);
}

export async function getCV() {
  return await client.fetch<Cv>(getCVQuery);
}

export async function getAudioFilesByProject(project: string) {
  return await client.fetch<AudioFileQuery[]>(getAudioFilesByProjectQuery, { project });
}

export async function getRandomWork() {
  const data = await client.fetch<Work[]>(getWorksQuery); 
  const size = data.length;
  const randIdx = Math.floor(Math.random() * size);
  return data[randIdx]; 
}
