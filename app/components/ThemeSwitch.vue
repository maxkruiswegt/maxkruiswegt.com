<script setup lang="ts">
import type { IconName } from '~/utils/icons';

type Theme = 'system' | 'light' | 'dark';

const { t } = useI18n();
const name = useId();

// The server always renders "system"; the stored choice is read after hydration, so the markup
// never mismatches. The page colours themselves were already set before paint by the head script.
// Shared state, so the header switch and the one in the mobile menu always agree.
const theme = useState<Theme>('theme', () => 'system');

onMounted(() => {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      theme.value = stored;
      syncThemeColor(stored);
    }
  } catch {
    // Storage blocked: stay on system.
  }
});

// theme-color is media-gated in the head for the OS setting; a manual choice overrides both tags.
function syncThemeColor(value: Theme) {
  const background = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.dataset.os ??= meta.content;
    meta.content = value === 'system' ? meta.dataset.os : background;
  });
}

function apply(value: Theme) {
  const root = document.documentElement;
  try {
    if (value === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', value);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  if (value === 'system') delete root.dataset.theme;
  else root.dataset.theme = value;
  syncThemeColor(value);
}

function select(value: Theme) {
  theme.value = value;
  // A short crossfade between the two palettes; instant when the visitor prefers less motion.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || typeof document.startViewTransition !== 'function') {
    apply(value);
    return;
  }
  // A skipped transition (hidden tab, quick double toggle) rejects these promises; the theme
  // itself is still applied by the update callback.
  const transition = document.startViewTransition(() => apply(value));
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
}

const options: { value: Theme; icon: IconName }[] = [
  { value: 'system', icon: 'monitor' },
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
];
</script>

<template>
  <fieldset class="theme-switch">
    <legend class="visually-hidden">{{ t('theme.legend') }}</legend>
    <label
      v-for="option in options"
      :key="option.value"
      class="option"
      :title="t(`theme.${option.value}`)"
    >
      <input
        type="radio"
        class="visually-hidden"
        :name="name"
        :value="option.value"
        :checked="theme === option.value"
        @change="select(option.value)"
      />
      <AppIcon :name="option.icon" />
      <span class="visually-hidden">{{ t(`theme.${option.value}`) }}</span>
    </label>
  </fieldset>
</template>

<style scoped>
.theme-switch {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--border);
  border-radius: 999px;
  min-inline-size: 0;
}

.option {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  color: var(--muted);
  cursor: pointer;
  transition:
    color 150ms var(--ease-out),
    background-color 150ms var(--ease-out);
}

.option svg {
  width: 1.15rem;
  height: 1.15rem;
}

.option:hover {
  color: var(--text);
}

.option:has(input:checked) {
  background: var(--surface);
  color: var(--text);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}

.option:has(input:focus-visible) {
  outline: 2px solid var(--focus);
  outline-offset: 1px;
}

@media (forced-colors: active) {
  .option:has(input:checked) {
    forced-color-adjust: none;
    background: SelectedItem;
    color: SelectedItemText;
  }
}
</style>
