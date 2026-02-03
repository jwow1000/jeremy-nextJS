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

export const getLatestPostsQuery = defineQuery(`
  *[_type == "work"] | order(date desc) [0...$amt]
`);

const blogPostItems = `
  title,
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  slug,
  date,
  featuredImage,
  tags[]->{
    _id,
    name,
    slug
  },
  gallery,
  body
`

export const getLatestBlogPostsQuery = defineQuery(`
  *[_type == "blogPost"] | order(date desc) [0...$amt] {
    ${blogPostItems}
  }
`);

export const getBlogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && $slug == slug.current][0] {
    ${blogPostItems}
  }
`); 

export const getTagBySlugQuery = defineQuery(`
  *[_type == "tag" && $slug == slug.current][0] 
`);

export const getBlogPostsByTagQuery = defineQuery(`
  *[_type == "blogPost" && $tagSlug in tags[]->slug.current] | order(date desc) 
 `);

export const getTagsQuery = defineQuery(`
  *[_type == "tag"] | order(date desc) 
 `);

