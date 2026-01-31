import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  description: 'A flexible blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Main title of Blog Post',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'Visible date of Post',
      type: 'date',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag'}],
        }
      ]
    }),
    defineField({
      name: 'gallery',
      type: 'object',
      title: 'Gallery',
      fields: [
        {
          name: 'images',
          type: 'array',
          of: [{type: 'customImage'}],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block', // standard text blocks
          styles: [
            {title: 'Normal P', value: 'normal' },
            {title: 'Left P', value: 'left' },
            {title: 'Right P', value: 'right' },
            {title: 'Center P', value: 'center' },
            {title: 'Header 1', value: 'h1' },
            {title: 'Header 2', value: 'h2' },
            {title: 'Header 3', value: 'h3' },
          ]
        },
        {
          type: 'code',
          options: {
            languageAlternatives: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'Python', value: 'python'},
              {title: 'Faust', value: 'faust'},
            ],
            withFilename: true,
          },
        },
        {
          type: 'customImage', // image embeds
          options: {hotspot: true},
        },
        {
          type: 'file', // for audio, PDFs, etc.
          title: 'File',
        },
        {
          type: 'object', // video embeds
          name: 'video',
          title: 'Video Embed',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
            },
          ],
        },
        {
          type: 'object', // audio embeds
          name: 'audio',
          title: 'Audio Embed',
          fields: [
            {
              name: 'url',
              title: 'Audio URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
})
