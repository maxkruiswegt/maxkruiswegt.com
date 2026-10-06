<script setup lang="ts">
const props = defineProps<{ value: string }>();

const { t } = useI18n();
const state = ref<'idle' | 'copied' | 'failed'>('idle');
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value);
    state.value = 'copied';
  } catch {
    state.value = 'failed';
  }
  clearTimeout(timer);
  timer = setTimeout(() => (state.value = 'idle'), 2500);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <button
    type="button"
    class="btn btn-quiet"
    @click="copy"
  >
    <AppIcon :name="state === 'copied' ? 'check' : 'copy'" />
    <span>{{ state === 'copied' ? t('contact.copied') : t('contact.copy') }}</span>
  </button>
  <!-- Hidden while it only confirms the visible "Copied"; shown when copying failed. -->
  <span
    :class="state === 'failed' ? 'small muted' : 'visually-hidden'"
    role="status"
    >{{ state === 'copied' ? t('contact.copied') : state === 'failed' ? t('contact.copyFailed') : '' }}</span
  >
</template>
