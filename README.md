# maxkruiswegt.com

My portfolio: one page about my work and a longer case study of [Kaizen](https://my-kaizen.com), the focus app I build. In English and Dutch, live at [maxkruiswegt.com](https://maxkruiswegt.com).

## Stack

Nuxt 4 with TypeScript, statically generated and hosted on Cloudflare Pages. `@nuxtjs/i18n` for the two languages, `@nuxt/content` for the case study, `@nuxt/fonts` to self-host Newsreader and Schibsted Grotesk. Plain CSS with design tokens, no UI framework and no state library.

A few things worth knowing:

- The theme follows the system setting, with a manual override applied by a small inline script before the first paint, so there is no flash.
- Scroll animations are CSS scroll-driven animations used as progressive enhancement. Without support, or with reduced motion, the content is simply there.
- Client logos are in colour on light pages and drawn as single-colour CSS masks on dark ones, where a lot of the original artwork would disappear.
- The Open Graph images are rendered from the site itself with headless Chrome (`npm run export:assets`).

## Development

Requires Node 24 (see `.node-version`).

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run generate   # static output in .output/public
```

Installs are hardened in `.npmrc`: a 7-day release cooldown, no git dependencies and no install scripts.
