<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

useHead({ title: t('404.title') });
</script>

<template>
  <div class="unknown-page hidden-element">
    <h1>{{ t('404.title') }}</h1>
    <p class="unknown-text">{{ t('404.description') }}</p>
    <NuxtLink
      :to="localePath('/')"
      class="unknown-button btn btn-primary"
    >
      {{ t('404.button') }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.unknown-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 55vh;
}

.unknown-text {
  color: var(--text-30);
  text-align: center;
}

.unknown-button {
  margin-top: 1rem;
}
</style>
