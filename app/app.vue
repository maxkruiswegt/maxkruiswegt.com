<script setup lang="ts">
import { site, kaizenLinks } from '~/data/site';

const { t } = useI18n();
const i18nHead = useLocaleHead({ seo: true });

// Open Graph wants language_TERRITORY: "en" -> "en_GB", "nl-NL" -> "nl_NL".
const ogLocale = (value: string) => (value === 'en' ? 'en_GB' : value.replace('-', '_'));

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} · Max Kruiswegt` : 'Max Kruiswegt'),
});

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link ?? [])],
  meta: (i18nHead.value.meta ?? []).map((tag) =>
    tag.property?.startsWith('og:locale') ? { ...tag, content: ogLocale(String(tag.content)) } : tag
  ),
}));

// One Person node for the whole site; every profile in sameAs links back here, and the Kaizen
// site's founder node points at the same person.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': `${site.url}/#person`,
            name: 'Max Kruiswegt',
            givenName: 'Max',
            familyName: 'Kruiswegt',
            url: site.url,
            image: `${site.url}/images/max/max-head-640.webp`,
            jobTitle: 'Frontend & React Native Developer',
            homeLocation: { '@type': 'Place', name: 'Haarlem, Netherlands' },
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Hogeschool Inholland Haarlem' },
            knowsAbout: ['React Native', 'Expo', 'TypeScript', 'Vue', 'Nuxt', 'Supabase', 'Tauri'],
            sameAs: [site.linkedin, site.github, kaizenLinks.about],
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: 'Max Kruiswegt',
            publisher: { '@id': `${site.url}/#person` },
          },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="app">
    <a
      href="#main"
      class="skip-link"
      >{{ t('nav.skip') }}</a
    >
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main
      id="main"
      tabindex="-1"
    >
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* A column too, so a short page (the 404) can grow into the space above the footer. */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
