import { BlogPost } from "../../../../../jwy-website-studio/sanity.types"

export type BlogPostWithTags = Omit<BlogPost, "tags"> & {
  tags?: {
    _id: string
    name: string
    slug?: { current: string }
  }[]
}

export type CvEntry = {
  _id: string
  category?: string
  title?: string
  artist?: string
  date?: string
  venue?: string
  location?: string
  role?: string
  link?: string
}
