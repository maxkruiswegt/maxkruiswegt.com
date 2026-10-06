// Runs before first paint: applies a stored light/dark override so the page never flashes the
// wrong theme. No stored value means "follow the OS", handled purely in CSS. It also flags Windows,
// whose browsers draw a classic scrollbar in a gutter instead of an overlay one (see main.css).
const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}var n=navigator,p=(n.userAgentData&&n.userAgentData.platform)||n.platform||'';if(/^win/i.test(p))d.dataset.scrollbar='classic'})()`;

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxt/content', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#f9f6f2', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0e1411', media: '(prefers-color-scheme: dark)' },
        { property: 'og:site_name', content: 'Max Kruiswegt' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: [{ innerHTML: themeScript, tagPriority: 'critical' }],
    },
  },

  site: {
    url: 'https://maxkruiswegt.com',
    name: 'Max Kruiswegt',
  },

  experimental: {
    // Morphs the Kaizen screenshot from the home page into the case study hero. Nuxt skips it
    // under prefers-reduced-motion and on back/forward swipes.
    viewTransition: true,
  },

  // Both families resolve from Google automatically. Naming the provider explicitly would swap the
  // metric-matched Arial/Times fallbacks for a generic one that matches no font, so the swap shifts layout.
  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
    },
    families: [
      {
        // Headings only, never body text. The optical-size axis runs from the smallest heading
        // (about 24px) to display sizes, so h2s don't get the spindly 72pt cut.
        name: 'Newsreader',
        weights: ['400 500'],
        providerOptions: { google: { experimental: { variableAxis: { opsz: [['24', '72']] } } } },
      },
      { name: 'Schibsted Grotesk', weights: ['400 600'] },
    ],
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'nl', language: 'nl-NL', file: 'nl.json', name: 'Nederlands' },
    ],
    baseUrl: 'https://maxkruiswegt.com',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    // No automatic redirects: the language link is always one tap away, and Google advises
    // against redirecting by browser language.
    detectBrowserLanguage: false,
    bundle: {
      compositionOnly: true,
    },
  },

  content: {
    renderer: {
      anchorLinks: false,
    },
    // Node's built-in node:sqlite (22.5+) instead of better-sqlite3, a native package that needs an
    // install script to fetch its binary, which .npmrc's ignore-scripts would skip.
    experimental: {
      nativeSqlite: true,
    },
  },

  // The Open Graph layout only exists for scripts/export-assets.mjs, which screenshots it on the dev
  // server; the PNGs it makes are static files. Production builds leave the page out entirely, so
  // /og doesn't exist on the live site (not even through the app's client-side routing).
  $production: {
    ignore: ['app/pages/og.vue'],
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      // Write kaizen.html instead of kaizen/index.html: Cloudflare Pages redirects a folder index
      // to a trailing-slash URL, which would put every canonical URL behind a redirect.
      autoSubfolderIndex: false,
      crawlLinks: true,
      // The sitemap module prerenders its own files (sitemap_index.xml with i18n).
      routes: ['/', '/nl', '/kaizen', '/nl/kaizen'],
      // /sitemap.xml would only be an HTML redirect page; public/_redirects sends it to the index.
      ignore: ['/sitemap.xml'],
    },
  },
});
