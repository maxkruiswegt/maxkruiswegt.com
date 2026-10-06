<script setup lang="ts">
import { icons, type IconName } from '~/utils/icons';

const props = defineProps<{ name: IconName }>();
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="d in icons[props.name]"
      :key="d"
      :d="d"
    />
  </svg>
</template>
