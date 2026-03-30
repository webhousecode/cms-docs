# i18n configuration

*Updated: 2026-03-30*

export default defineConfig({
  defaultLocale: 'en',
  locales: ['en', 'da'],
  collections: [
    defineCollection({
      name: 'posts',
      sourceLocale: 'en',
      locales: ['en', 'da'],
      translatable: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richtext' },
      ],
    }),
  ],
});