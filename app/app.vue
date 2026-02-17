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
