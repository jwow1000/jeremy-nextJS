import client from "@/sanity/lib/client";
import { getWorksQuery, getWorkBySlugQuery, getCVQuery, getAudioFilesByProjectQuery, getWebWorksQuery, getLatestPostsQuery, getLatestBlogPostsQuery, getBlogPostBySlugQuery} from "@/sanity/lib/queries"
import {Work, Cv, Audio, CustomImage, BlogPost} from "@/../../jwy-website-studio/sanity.types";
import { BlogPostWithTags } from "./types/customTypes";

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

export async function getLatestPosts(amt: number) {
  return await client.fetch<Work[]>(getLatestPostsQuery, {amt});
}

export async function getLatestBlogPosts(amt: number) {
  return await client.fetch<BlogPostWithTags[]>(getLatestBlogPostsQuery, {amt});
}

export async function getBlogPostBySlug(slug: string) {
  return await client.fetch<BlogPostWithTags>(getBlogPostBySlugQuery, {slug});
}
