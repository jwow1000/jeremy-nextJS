import {defineQuery} from "next-sanity";

export const getWorksQuery = defineQuery(`
  *[_type == "work"] | order(date desc)
`);

export const getWorkBySlugQuery = defineQuery(`
  *[_type == "work" && $slug == slug.current][0]
`);

export const getCVQuery = defineQuery(`
  *[_type == "cv"][0]
`);