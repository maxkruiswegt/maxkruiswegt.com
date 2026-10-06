<script setup lang="ts">
import { rememberSectionInView } from '~/utils/languageSwitchAnchor';

// A real link to the other language version (no flags, no auto-redirect). The visitor stays at
// the section they were reading: see utils/languageSwitchAnchor.ts.
const props = withDefaults(defineProps<{ long?: boolean }>(), { long: false });

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const other = computed(() => (locale.value === 'nl' ? 'en' : 'nl'));
const label = computed(() => (other.value === 'nl' ? 'Nederlands' : 'English'));
const to = computed(() => switchLocalePath(other.value).split('#')[0]);
</script>

<template>
  <NuxtLink
    :to="to"
    :hreflang="other"
    :lang="other"
    class="lang-switch"
    @click="rememberSectionInView"
  >
    <span v-if="props.long">{{ label }}</span>
    <template v-else>
      {{ other.toUpperCase() }}<span class="visually-hidden">, {{ label }}</span>
    </template>
  </NuxtLink>
</template>

<style scoped>
.lang-switch {
  display: inline-grid;
  place-items: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding-inline: 0.5rem;
  color: var(--text);
  font-weight: 600;
  font-size: var(--step--1);
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: var(--radius-s);
}

.lang-switch:hover {
  color: var(--accent);
}
</style>
