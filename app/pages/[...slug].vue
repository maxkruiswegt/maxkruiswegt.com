<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useHead({ title: t('notFound.title') });
useSeoMeta({ robots: 'noindex' });

// A real 404 status, so a broken internal link fails the prerender instead of becoming a page.
const event = useRequestEvent();
if (event) setResponseStatus(event, 404);
</script>

<template>
  <section class="not-found container">
    <h1>{{ t('notFound.title') }}</h1>
    <p class="muted">{{ t('notFound.body') }}</p>
    <NuxtLink
      :to="localePath('/')"
      class="btn btn-primary"
    >
      {{ t('notFound.home') }}
      <AppIcon name="arrow-right" />
    </NuxtLink>
  </section>
</template>

<style scoped>
/* Fills the space between header and footer, with the message in the middle of it. */
.not-found {
  flex: 1;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: var(--space-s);
  padding-block: var(--space-2xl);
  max-width: var(--measure);
  text-align: center;
}
</style>
