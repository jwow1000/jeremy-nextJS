import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'customImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true, // Enables cropping and focal point selection
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility',
      validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image',
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
    prepare({ imageUrl, title }) {
      return {
        title: title || 'Untitled image',
        media: imageUrl,
      }
    },
  },
})