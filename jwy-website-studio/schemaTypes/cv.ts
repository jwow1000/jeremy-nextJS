import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array', 
      of: [{type: 'block'}]
    })
  ]
})