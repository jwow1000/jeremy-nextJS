import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'audio',
  title: 'Audio File',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: 'projectTitle',
      title: 'Project Title',
      type: 'string',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {accept: 'audio/*'},
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
    }),
  ]
})