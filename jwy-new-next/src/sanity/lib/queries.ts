import {defineQuery} from "next-sanity";

export const getWorksQuery = defineQuery(`
  *[_type == "work"] | order(date desc)
`);

export const getWebWorksQuery = defineQuery(`
  *[_type == "work" && "webProject" in type] | order(date desc)
`);

export const getWorkBySlugQuery = defineQuery(`
  *[_type == "work" && $slug == slug.current][0]
`);

export const getCVQuery = defineQuery(`
  *[_type == "cv"][0]
`);

export const getAudioFilesByProjectQuery = defineQuery(`
  *[_type == "audio" && $project == projectTitle] {
      title,
      projectTitle,
      _id,
      featuredImage,
      description,
      "audioUrl": audioFile.asset->url // Project the asset's URL
    }
`);
