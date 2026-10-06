# Project: maxkruiswegt.com

Personal portfolio website for Max Kruiswegt / MK Development. Nuxt 4 SSG with dual-language support (EN/NL), dark/light theming, and TypeScript.

## Commands

- `npm run dev` — Start Nuxt dev server
- `npm run generate` — Static site generation to `.output/public/`
- `npm run preview` — Preview production build locally
- `npm run build` — Production build (SSR mode)
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run vue-tsc via `nuxt typecheck`

There is no test suite configured.

## Dependencies

`.npmrc` hardens installs: a 7-day `min-release-age` cooldown, `allow-git=none`, and `ignore-scripts=true` (the project has no lifecycle scripts, and its native deps ship prebuilt binaries). An urgent fix can bypass the cooldown once with `--min-release-age=0`; verify the tree with `npm audit signatures --min-release-age=0`. Nuxt Content uses Node's built-in `node:sqlite` (`content.experimental.nativeSqlite`), not better-sqlite3. TypeScript stays on 6.x: TS 7 drops the JS compiler API that vue-tsc and typescript-eslint need.

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3 with Composition API, `<script setup lang="ts">`)
- **Build:** Vite (via Nuxt)
- **Routing:** File-based routing (auto-generated from `app/pages/`)
- **State:** Pinia (`@pinia/nuxt` module, auto-imported)
- **i18n:** `@nuxtjs/i18n` v9 (EN default, NL via `/nl` prefix routes, `prefix_except_default` strategy)
- **Content:** `@nuxt/content` v3 (file-based CMS for portfolio projects)
- **Styling:** Custom CSS with CSS variables (no Tailwind/Bootstrap)
- **HTTP:** `$fetch` (built-in)
- **TypeScript:** Enabled project-wide

## Architecture

```
app/
├── app.vue                     # Root layout (navbar, NuxtPage, footer)
├── router.options.ts           # Custom scroll behavior
├── assets/css/main.css         # Global styles, theme vars, prose, animations
├── components/                 # Auto-imported components
│   ├── AppNavbar.vue           # Navigation bar with theme toggle and language switcher
│   ├── AppFooter.vue           # Footer with links and social icons
│   ├── ProjectPreview.vue      # Portfolio project card (used in listing)
│   └── content/
│       └── ProseA.vue          # Prose override: external links get target="_blank" + icon
├── pages/                      # File-based routes
│   ├── index.vue               # Home page (/)
│   ├── contact.vue             # Contact page (/contact)
│   ├── [...slug].vue           # 404 catch-all
│   └── portfolio/
│       ├── index.vue           # Portfolio listing (/portfolio)
│       └── [id].vue            # Project detail (/portfolio/:id)
├── stores/
│   └── ThemeStore.ts           # Dark/light theme state with localStorage persistence
├── composables/
│   └── useObserver.ts          # Scroll animations (hidden-element → show-element)
└── plugins/
    └── theme.client.ts         # Apply saved theme on client init
content/
├── en/projects/*.md            # English project content (6 files)
└── nl/projects/*.md            # Dutch project content (6 files)
content.config.ts               # Collection definitions with zod schema
i18n/
└── locales/                    # en.json, nl.json translation files
public/
└── images/                     # Logos, profile photos, project screenshots (all WebP)
nuxt.config.ts                  # Nuxt configuration
```

## Code Style

- TypeScript throughout (`<script setup lang="ts">`)
- Auto-imports: no manual imports needed for Vue APIs, Nuxt utilities, components, composables, or stores
- `~/` path alias for `app/` directory
- Prettier: single quotes, semicolons, trailing commas (es5), 2-space indent, 120 char width, single attribute per line
- Components: PascalCase filenames and usage
- CSS classes: kebab-case
- All component styles use `<style scoped>`
- Fonts: Inter (body), Poppins (headings), Material Symbols Outlined (icons) — loaded via `nuxt.config.ts` head links

## Routing & i18n

Routes are auto-generated from `app/pages/` directory. `@nuxtjs/i18n` with `prefix_except_default` strategy handles locale routing automatically:

- English routes at root: `/`, `/portfolio`, `/contact`, `/portfolio/:id`
- Dutch routes under `/nl`: `/nl`, `/nl/portfolio`, `/nl/contact`, `/nl/portfolio/:id`

Use `useLocalePath()` for localized paths: `localePath('/portfolio')`.
Use `setLocale()` for language switching.
Use `<NuxtLink>` instead of `<RouterLink>`.

## Portfolio Content (@nuxt/content v3)

Portfolio project data lives in `content/{en,nl}/projects/*.md` as markdown files with frontmatter:

```markdown
---
title: 'Project Name'
description: 'Short description.'
images:
  - /images/project/Banner.webp
---

Markdown body content here...
```

Collections are defined in `content.config.ts` with a zod schema (`title`, `description`, `images`). Two collections: `projects_en` and `projects_nl`.

**Querying:** Use `queryCollection()` with locale-based collection switching:

```ts
const collectionName = computed(() => `projects_${locale.value}` as 'projects_en' | 'projects_nl');
const { data } = await useAsyncData(key, () => queryCollection(collectionName.value).all(), { watch: [locale] });
```

**Rendering:** Markdown body is rendered via `<ContentRenderer :value="project" />` wrapped in a `<div class="prose">`. Prose styles are defined in `main.css` following GitHub's markdown spacing pattern.

**Prose component overrides** go in `app/components/content/` (e.g., `ProseA.vue` for custom link handling).

## Theming

Dark mode is the default. Light mode applies via `.light` class on `<html>`. Theme persists to `localStorage` and uses `skipHydrate` to prevent SSR payload leaks. CSS variables define all colors — always use them, never hardcode colors. The `theme.client.ts` plugin calls `initTheme()` to apply saved theme before hydration.

## Scroll Animations

Elements with class `hidden-element` get `show-element` added on viewport intersection via `useObserver` composable. The composable manages its own lifecycle (onMounted/onBeforeUnmount) and scopes the MutationObserver to `.main-content`.

## SSR Safety

- Guard browser APIs (`localStorage`, `document`, `window`) with `import.meta.client`
- Wrap client-only components (carousel) in `<ClientOnly>`
- Client-only plugins use `.client.ts` suffix
- Use `skipHydrate` from pinia for refs that should not be serialized in SSR payload

## Deployment

Cloudflare Pages builds and deploys on push to `main` (`nuxt generate`, output `.output/public/`). The build's Node version comes from `.node-version`.

## Important Notes

- Images use WebP format throughout — keep this convention
- Max content width is `1280px` (set on `.main-content`, `header`, `footer` in `app.vue`)
- `nuxt generate` produces fully static HTML files (SSG) for SEO
- Nitro compresses public assets via `compressPublicAssets: true`
- i18n `compositionOnly: true` tree-shakes Options API from vue-i18n bundle
- Heading hierarchy: every page has one `<h1>`, markdown content uses `##` (h2) as top-level headings
- `content.renderer.anchorLinks: false` disables automatic anchor links on headings
