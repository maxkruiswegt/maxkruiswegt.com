export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: { compatibilityVersion: 4 },

  app: {
    head: {
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Max Kruiswegt' },
        { property: 'og:image', content: 'https://maxkruiswegt.com/images/Max.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
        {
          rel: 'icon',
          href: '/favicon-dark.ico',
          type: 'image/x-icon',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'icon',
          href: '/favicon.ico',
          type: 'image/x-icon',
          media: '(prefers-color-scheme: dark)',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/content'],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'nl', language: 'nl-NL', file: 'nl.json', name: 'Nederlands' },
    ],
    baseUrl: 'https://maxkruiswegt.com',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
      compositionOnly: true,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
});
