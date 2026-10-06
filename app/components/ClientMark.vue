<script setup lang="ts">
import type { Client } from '~/data/clients';

// Decorative: every logo sits next to the client's name in text, so screen readers skip it.
const props = defineProps<{ logo: Client['logo'] }>();

// Each theme shows the logo in colour: light mode its own artwork, dark mode the `dark` artwork
// (the same file when it reads on a dark page, otherwise a reversed version). A logo without dark
// artwork falls back to the single-colour mask there, as does every logo in forced colours.
// SVGs keep their colours in `src`; raster logos have a separate colour file.
const light = computed(() => {
  if (props.logo.color) return props.logo.color;
  return props.logo.src.endsWith('.svg') ? { src: props.logo.src, ratio: props.logo.ratio, scale: props.logo.scale } : undefined;
});
const dark = computed(() => (props.logo.dark && light.value ? { ...light.value, src: props.logo.dark } : undefined));
</script>

<template>
  <div
    class="client-mark"
    aria-hidden="true"
  >
    <img
      v-if="light"
      :src="light.src"
      alt=""
      loading="lazy"
      class="logo image light"
      :style="{ '--r': light.ratio, '--s': light.scale ?? 1 }"
    />
    <img
      v-if="dark"
      :src="dark.src"
      alt=""
      loading="lazy"
      class="logo image dark"
      :style="{ '--r': dark.ratio, '--s': dark.scale ?? 1 }"
    />
    <span
      class="logo mask"
      :class="{ 'dark-only': light, 'forced-only': dark }"
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

/* Drawn from the logo's own shape: the text colour on light pages, white on dark ones. */
.mask {
  background: var(--logo-ink);
  -webkit-mask: var(--src) left center / contain no-repeat;
  mask: var(--src) left center / contain no-repeat;
}

/* Which artwork shows is set per theme in main.css (--logo-light / --logo-dark). */
.image.light {
  display: var(--logo-light);
}

.image.dark,
.mask.dark-only {
  display: var(--logo-dark);
}

.mask.forced-only {
  display: none;
}

@media (forced-colors: active) {
  .image.light,
  .image.dark {
    display: none;
  }

  .mask,
  .mask.dark-only,
  .mask.forced-only {
    display: block;
    forced-color-adjust: none;
    background: CanvasText;
  }
}
</style>
