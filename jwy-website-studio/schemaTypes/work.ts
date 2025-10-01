import {defineField, defineType} from 'sanity'

export const work = defineType({
  name: 'work',
  title: 'Work',
  description: 'multifaceted type to cover most works',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'title of work',
      type: 'string',
    }),
    {
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    defineField({
      name: 'type',
      title: 'Type',
      description: 'work type',
      type: 'string',
      options: {
        list: [
          {title: "Object", value: "object"},
          {title: "Video", value: "video"},
          {title: "Sound", value: "sound"},
          {title: "Web Project", value: "webProject"},
        ]
      }
    }),
    defineField({
      name: 'subType',
      title: 'Sub Type',
      description: 'Sub Type for the main types',
      type: 'string',
      options: {
        list: [
          {title: "Immix", value: "immix"},
          {title: "Subway", value: "subway"},
        ]
      }
    }),
    defineField({
      name: 'date',
      title: 'Date',
      description: 'Date of work',
      type: 'date',
    }),
    defineField({
      name: 'vidLink',
      title: 'Video Link',
      type: 'url',
    }),
    defineField({
      name: 'soundLink',
      title: 'Sound Link',
      type: 'url',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'customImage',
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
      name: 'text', 
      title: 'Text',
      description: 'Text and desrciption', 
      type: 'array', 
      of: [{type: 'block'}]
    }),
  ],

})
