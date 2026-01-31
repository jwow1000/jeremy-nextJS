import {defineField, defineType} from 'sanity'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description to handle evertything',
      type: 'array',
      of: [
        {
          type: 'block', // standard text blocks
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
