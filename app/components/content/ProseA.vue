<script setup lang="ts">
const props = defineProps<{
  href?: string;
  target?: string;
}>();

const isExternal = computed(() => {
  return props.href?.startsWith('http') || props.href?.startsWith('//');
});
</script>

<template>
  <NuxtLink
    :to="href"
    :target="isExternal ? '_blank' : target"
  >
    <slot />
    <span
      v-if="isExternal"
      class="material-symbols-outlined external-link-icon"
      aria-hidden="true"
      >open_in_new</span
    >
  </NuxtLink>
</template>

<style scoped>
.external-link-icon {
  font-size: 0.875em;
  margin-left: 0.15em;
  vertical-align: middle;
  opacity: 0.6;
}
</style>
