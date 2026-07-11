import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fieldsets: [
            { name: 'meta', title: ' ', options: { columns: 1 } },
          ],
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              fieldset: 'meta',
            }),
            defineField({
              name: 'entries',
              title: 'Entries',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'entry',
                  title: 'Entry',
                  fieldsets: [
                    { name: 'who', title: 'Who', options: { columns: 2 } },
                    { name: 'where', title: 'Where', options: { columns: 2 } },
                    { name: 'when', title: 'When', options: { columns: 2 } },
                  ],
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'artist',
                      title: 'Artist / Collaborator',
                      type: 'string',
                      fieldset: 'who',
                    }),
                    defineField({
                      name: 'role',
                      title: 'Role / Description',
                      type: 'string',
                      fieldset: 'who',
                    }),
                    defineField({
                      name: 'date',
                      title: 'Date',
                      type: 'string',
                      fieldset: 'when',
                    }),
                    defineField({
                      name: 'link',
                      title: 'Link',
                      type: 'url',
                      fieldset: 'when',
                    }),
                    defineField({
                      name: 'venue',
                      title: 'Venue',
                      type: 'string',
                      fieldset: 'where',
                    }),
                    defineField({
                      name: 'location',
                      title: 'Location',
                      type: 'string',
                      fieldset: 'where',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      artist: 'artist',
                      venue: 'venue',
                      date: 'date',
                    },
                    prepare({ title, artist, venue, date }) {
                      const subtitle = [artist, venue, date].filter(Boolean).join(' · ')
                      return { title: title ?? 'Untitled', subtitle }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title: title ?? 'Untitled Section' }
            },
          },
        }),
      ],
    }),
  ],
})
