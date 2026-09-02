<script setup lang="ts">
const { t } = useI18n();
const i18nHead = useLocaleHead({ seo: true });

useObserver();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Max Kruiswegt` : 'Max Kruiswegt';
  },
});

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs!.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

// Identity home: one Person node, corroborated by every profile in `sameAs`
// (each of which links back here). The Kaizen site's founder node points at
// my-kaizen.com/about, listed here so the two entities resolve to one person.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://maxkruiswegt.com/#person',
            name: 'Max Kruiswegt',
            givenName: 'Max',
            familyName: 'Kruiswegt',
            url: 'https://maxkruiswegt.com',
            image: 'https://maxkruiswegt.com/images/Max.webp',
            email: 'mailto:info@maxkruiswegt.com',
            jobTitle: 'Frontend & React Native Developer',
            description:
              'Frontend and React Native developer from Haarlem, the Netherlands, and the founder of Kaizen, a Pomodoro app with camera-free Focus Rooms.',
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Hogeschool Inholland Haarlem' },
            knowsAbout: ['React Native', 'Expo', 'TypeScript', 'Vue', 'Nuxt', 'Supabase', 'Tauri'],
            sameAs: [
              'https://www.linkedin.com/in/maxkruiswegt/',
              'https://github.com/maxkruiswegt',
              'https://my-kaizen.com/about',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': 'https://maxkruiswegt.com/#website',
            url: 'https://maxkruiswegt.com',
            name: 'Max Kruiswegt',
            publisher: { '@id': 'https://maxkruiswegt.com/#person' },
          },
        ],
      }),
    },
  ],
});

useSeoMeta({
  description: () => t('meta.description'),
  ogTitle: 'Max Kruiswegt',
  ogDescription: () => t('meta.description'),
});
</script>

<template>
  <div class="app-wrapper background-pattern">
    <div class="main-app">
      <header>
        <AppNavbar />
      </header>
      <main class="main-content">
        <NuxtPage />
      </main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Extra Small Devices (Less than 576px) */
.app-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-content,
header {
  width: 100%;
  max-width: 1280px;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 1rem;
}

header {
  animation: fade-down 400ms cubic-bezier(0, 0, 0.2, 1);
  padding: 1rem;
}

footer {
  animation: fade-up 400ms cubic-bezier(0, 0, 0.2, 1);
  width: 100%;
}

/* Large Devices*/
@media screen and (min-width: 992px) {
  .main-content {
    padding: 4.5rem 2rem;
  }

  header {
    padding: 2rem;
  }
}
</style>
