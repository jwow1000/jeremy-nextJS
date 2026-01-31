import { BlogPost } from "../../../../../jwy-website-studio/sanity.types"

export type BlogPostWithTags = Omit<BlogPost, "tags"> & {
  tags?: {
    _id: string
    name: string
    slug?: { current: string }
  }[]
}
