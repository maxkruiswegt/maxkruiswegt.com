<script setup lang="ts">
const props = defineProps<{ id?: string }>();

const { t } = useI18n();
</script>

<template>
  <!-- GFM names the footnotes heading in English on every page; use the page's language instead. -->
  <h2 :id="props.id">
    <template v-if="props.id === 'footnote-label'">{{ t('caseStudy.footnotes') }}</template>
    <slot v-else />
  </h2>
</template>
