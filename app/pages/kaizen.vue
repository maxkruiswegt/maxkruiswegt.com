<script setup lang="ts">
import { site } from '~/data/site';

const { t, locale } = useI18n();
const localePath = useLocalePath();

// Each language is its own route, so the locale is fixed for this page instance. Not watching it
// keeps a language switch from querying the old page's collection in the browser (which would
// pull in Nuxt Content's SQLite WASM) before the new page's payload arrives.
const lang = locale.value as 'en' | 'nl';
const { data: page } = await useAsyncData(`kaizen-${lang}`, () => queryCollection(`kaizen_${lang}`).first());

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true });
}

useHead({ title: () => page.value?.title ?? 'Kaizen' });

useSeoMeta({
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogType: 'article',
  ogImage: `${site.url}/og/kaizen-${lang}.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => page.value?.title,
});

const pageUrl = `${site.url}${localePath('/kaizen')}`;

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.value?.title,
        description: page.value?.description,
        inLanguage: lang === 'nl' ? 'nl-NL' : 'en',
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: `${site.url}/og/kaizen-${lang}.png`,
        author: { '@type': 'Person', '@id': `${site.url}/#person`, name: 'Max Kruiswegt', url: site.url },
        datePublished: '2026-10-06',
        dateModified: site.updated,
        about: { '@type': 'SoftwareApplication', name: 'Kaizen', url: 'https://my-kaizen.com' },
      }),
    },
  ],
}));
</script>

<template>
  <article
    v-if="page"
    class="case"
  >
    <header class="intro container">
      <div class="intro-text">
        <nav
          :aria-label="t('caseStudy.breadcrumb')"
          class="crumbs small"
        >
          <ol role="list">
            <li>
              <NuxtLink :to="localePath('/')">{{ t('caseStudy.home') }}</NuxtLink>
            </li>
            <li aria-current="page">Kaizen</li>
          </ol>
        </nav>
        <img
          src="/images/kaizen/icon.webp"
          width="64"
          height="64"
          alt=""
          class="app-icon"
        />
        <h1>{{ page.title }}</h1>
        <p class="lede">{{ t('caseStudy.lede') }}</p>
      </div>
      <div class="hero-phones">
        <img
          src="/images/kaizen/timer.webp"
          width="720"
          height="1560"
          :alt="t('kaizen.timerAlt')"
          fetchpriority="high"
          class="shot phone"
          style="view-transition-name: kaizen-phone"
        />
        <img
          src="/images/kaizen/room.webp"
          width="720"
          height="1560"
          :alt="t('kaizen.roomAlt')"
          decoding="async"
          class="shot phone phone-second"
          style="view-transition-name: kaizen-room"
        />
      </div>
    </header>

    <KaizenSummary />
    <KaizenTour />

    <div class="body container">
      <ContentRenderer
        :value="page"
        class="prose"
      />
    </div>

    <footer class="end container">
      <p>
        <i18n-t
          keypath="caseStudy.end"
          scope="global"
        >
          <template #email>
            <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          </template>
        </i18n-t>
      </p>
    </footer>
  </article>
</template>

<style scoped>
.intro {
  display: grid;
  gap: var(--space-l);
  align-items: start;
  padding-top: var(--space-xl);
  padding-bottom: var(--space-l);
}

.intro-text {
  display: grid;
  gap: var(--space-s);
  max-width: 44rem;
}

.app-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 22.5%;
  margin-top: var(--space-xs);
}

.crumbs ol {
  display: flex;
  gap: 0.5em;
  color: var(--muted);
}

.crumbs li + li::before {
  /* The separator is decoration; the empty alt text keeps screen readers from reading "slash". */
  content: '/';
  content: '/' / '';
  margin-right: 0.5em;
}

.crumbs a {
  color: var(--muted);
}

.crumbs [aria-current] {
  color: var(--text);
}

h1 {
  font-size: var(--step-hero);
  line-height: 1;
  letter-spacing: -0.02em;
}

.lede {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--muted);
}

/* The same pair as the home page's Kaizen section: the timer (which morphs in from there) and a
   Focus Room, the second a little lower so neither hides part of the other. */
.hero-phones {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-s);
  align-items: start;
  width: min(100%, 26rem);
  justify-self: start;
}

.phone {
  --shot-radius: 9% / 4.2%;
  width: 100%;
}

.phone-second {
  margin-top: 16%;
}

.body {
  padding-block: var(--space-xl) var(--space-l);
  border-top: 1px solid var(--border);
}

.body :deep(.prose) {
  max-width: var(--measure);
}

.end {
  padding-block: var(--space-l) var(--space-2xl);
  font-size: var(--step-1);
}

.end p {
  max-width: var(--measure);
  padding-top: var(--space-m);
  border-top: 1px solid var(--border);
}

@media (min-width: 56rem) {
  .intro {
    grid-template-columns: minmax(0, 1fr) auto;
    padding-top: var(--space-2xl);
  }

  .hero-phones {
    width: 28rem;
    justify-self: end;
  }
}
</style>
