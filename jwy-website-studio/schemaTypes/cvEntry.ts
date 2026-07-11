import { defineField, defineType } from 'sanity'

export const CATEGORY_LIST = [
  { title: 'Exhibitions', value: 'exhibitions' },
  { title: 'Sound', value: 'sound' },
  { title: 'Residencies / Awards', value: 'residencies' },
  { title: 'AV Support', value: 'support' },
]

export const cvEntry = defineType({
  name: 'cvEntry',
  title: 'CV Entry',
  type: 'document',
  fieldsets: [
    { name: 'who', title: 'Who', options: { columns: 2 } },
    { name: 'where', title: 'Where', options: { columns: 2 } },
    { name: 'when', title: 'When', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: CATEGORY_LIST, layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'artist', title: 'Artist / Collaborator', type: 'string', fieldset: 'who' }),
    defineField({ name: 'role', title: 'Role / Description', type: 'string', fieldset: 'who' }),
    defineField({ name: 'date', title: 'Date', type: 'string', fieldset: 'when' }),
    defineField({ name: 'link', title: 'Link', type: 'url', fieldset: 'when' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string', fieldset: 'where' }),
    defineField({ name: 'location', title: 'Location', type: 'string', fieldset: 'where' }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order within the category (lower = first)',
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category', date: 'date', venue: 'venue' },
    prepare({ title, category, date, venue }) {
      const cat = CATEGORY_LIST.find((c) => c.value === category)
      const subtitle = [cat?.title, venue, date].filter(Boolean).join(' · ')
      return { title: title ?? 'Untitled', subtitle }
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})
