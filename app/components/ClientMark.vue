<script setup lang="ts">
import type { Client } from '~/data/clients';

// Decorative: every logo sits next to the client's name in text, so screen readers skip it.
const props = defineProps<{ logo: Client['logo'] }>();

// Light mode shows the logo in its own colours. Dark mode (and forced colours) uses the
// single-colour mask instead: many of these logos are dark artwork that vanishes on a dark page.
// SVGs keep their colours in `src`; raster logos have a separate colour file.
const color = computed(() => {
  if (props.logo.color) return props.logo.color;
  return props.logo.src.endsWith('.svg') ? { src: props.logo.src, ratio: props.logo.ratio, scale: props.logo.scale } : undefined;
});
</script>

<template>
  <div
    class="client-mark"
    aria-hidden="true"
  >
    <img
      v-if="color"
      :src="color.src"
      alt=""
      loading="lazy"
      class="logo image"
      :style="{ '--r': color.ratio, '--s': color.scale ?? 1 }"
    />
    <span
      class="logo mask"
      :class="{ 'dark-only': color }"
      :style="{
        '--src': `url(${props.logo.src})`,
        '--r': props.logo.ratio,
        '--s': props.logo.scale ?? 1,
      }"
    />
  </div>
</template>

<style scoped>
.client-mark {
  --base: 3rem;
  --max-w: 12rem;
  --max-h: 3.5rem;
  display: flex;
  align-items: center;
  height: var(--max-h);
  color: var(--text);
}

/* Sized halfway between equal height and equal area (height = base / ratio^0.25), so heights stay
   close together without square marks looking heavy or long wordmarks running very wide. */
.logo {
  display: block;
  width: min(calc(var(--base) * var(--s) * pow(var(--r), 0.75)), var(--max-w));
  max-height: var(--max-h);
  aspect-ratio: var(--r);
}

.image {
  object-fit: contain;
  object-position: left center;
}

/* Drawn in the text colour from the logo's own shape. */
.mask {
  background: currentColor;
  -webkit-mask: var(--src) left center / contain no-repeat;
  mask: var(--src) left center / contain no-repeat;
  opacity: 0.88;
}

/* Which of the two shows is set per theme in main.css (--logo-color / --logo-mask). */
.image {
  display: var(--logo-color);
}

.mask.dark-only {
  display: var(--logo-mask);
}

@media (forced-colors: active) {
  .image {
    display: none;
  }

  .mask,
  .mask.dark-only {
    display: block;
    forced-color-adjust: none;
    background: CanvasText;
  }
}
</style>
