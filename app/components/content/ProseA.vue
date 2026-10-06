<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  href?: string;
  target?: string;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const isExternal = computed(() => Boolean(props.href?.startsWith('http') || props.href?.startsWith('//')));
// GFM labels footnote back links in English ("Back to reference 1"); use the page's language.
const ariaLabel = computed(() =>
  'data-footnote-backref' in attrs ? t('caseStudy.footnoteBack') : (attrs['aria-label'] as string | undefined)
);
</script>

<template>
  <NuxtLink
    v-bind="attrs"
    :to="href"
    :target="isExternal ? '_blank' : target"
    :rel="isExternal ? 'noopener' : undefined"
    :aria-label="ariaLabel"
    class="prose-link"
  >
    <slot />
    <template v-if="isExternal">
      <AppIcon
        name="arrow-up-right"
        class="external"
      />
      <span class="visually-hidden">{{ t('a11y.newTab') }}</span>
    </template>
  </NuxtLink>
</template>

<style scoped>
.external {
  display: inline;
  width: 0.8em;
  height: 0.8em;
  margin-left: 0.1em;
  vertical-align: -0.05em;
  opacity: 0.7;
}
</style>
