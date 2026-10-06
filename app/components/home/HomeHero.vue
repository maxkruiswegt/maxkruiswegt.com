<script setup lang="ts">
import { kaizenFigures, site } from '~/data/site';

const { t } = useI18n();
const localePath = useLocalePath();
const { number } = useLocalized();
</script>

<template>
  <section
    class="hero"
    aria-labelledby="hero-title"
  >
    <div class="container hero-grid">
      <div class="text">
        <h1 id="hero-title"><span>Max</span> <span>Kruiswegt</span></h1>
        <p class="role">{{ t('hero.role') }}</p>
        <p class="intro">{{ t('hero.intro', { signups: number(kaizenFigures.signups) }) }}</p>
        <p class="status">{{ t('hero.status') }}</p>
        <div class="actions">
          <NuxtLink
            :to="localePath('/kaizen')"
            class="btn btn-primary"
          >
            {{ t('hero.caseStudy') }}
            <AppIcon name="arrow-right" />
          </NuxtLink>
          <a
            :href="`mailto:${site.email}`"
            class="email-link"
            >{{ t('hero.email') }}</a
          >
        </div>
      </div>

      <div class="portrait">
        <div
          class="portrait-block"
          aria-hidden="true"
        />
        <img
          src="/images/max/max-800.webp"
          srcset="/images/max/max-480.webp 480w, /images/max/max-800.webp 800w, /images/max/max-1200.webp 1200w"
          sizes="(min-width: 64rem) 30rem, min(34vw, 12rem)"
          width="800"
          height="1105"
          :alt="t('hero.photoAlt')"
          fetchpriority="high"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: var(--space-xl);
  overflow: hidden;
}

/*
 * Phones and tablets: the photo (left) and the name share the opening, and the rest of the text
 * runs full width below. `.text` steps aside (display: contents) so its children sit in this grid
 * directly; the document order stays text first.
 *
 * Row 2 is exactly as tall as the green block: the bottom 66% of the photo, which is 90% of the
 * column wide at 1105/800 (0.66 * 0.9 * 1.38125 = 0.8205). The photo spans both rows, so the head
 * fills row 1, and the name is centred in row 2, on the block.
 */
.hero-grid {
  --photo-col: min(34cqi, 12rem);
  --block: calc(0.8205 * var(--photo-col));
  container-type: inline-size;
  display: grid;
  grid-template-columns: var(--photo-col) minmax(0, 1fr);
  grid-template-rows: auto var(--block);
  column-gap: var(--space-s);
}

.text {
  display: contents;
}

.text > * {
  grid-column: 1 / -1;
  justify-self: start;
  margin-top: var(--space-s);
}

h1 {
  font-size: var(--step-hero);
  line-height: 0.98;
  letter-spacing: -0.02em;
}

/* "Max" and "Kruiswegt" on their own lines. text-box trims each line box to the letters themselves
   (top of the capitals to the baseline), so centring centres what you see. The size keeps both
   lines within the block and "Kruiswegt" beside the photo, down to 320px wide. */
.text > h1 {
  grid-column: 2;
  grid-row: 2;
  align-self: center;
  margin-top: 0;
  font-size: min(var(--step-hero), 11.5vw, calc(var(--block) / 2.1));
  text-box: trim-both cap alphabetic;
}

.text > h1 span {
  display: block;
}

.role {
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.intro {
  font-size: var(--step-1);
  line-height: 1.5;
  max-width: 38rem;
}

.status {
  position: relative;
  max-width: 34rem;
  padding-left: 1.15em;
  color: var(--muted);
}

/* A status dot: reads as "current", not as a list bullet. Static on purpose, nothing in the hero
   moves. It hangs in the indent, so a wrapped line lines up with the text, not with the dot. */
.status::before {
  content: '';
  position: absolute;
  left: 0.22em;
  top: calc(0.775em - 0.25em);
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: var(--status);
  box-shadow: 0 0 0 0.22em color-mix(in srgb, var(--status) 24%, transparent);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs) var(--space-s);
  margin-top: var(--space-m);
  margin-bottom: var(--space-xl);
}

.email-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  font-weight: 500;
}

.portrait {
  grid-column: 1;
  grid-row: 1 / span 2;
  align-self: end;
  position: relative;
  display: grid;
}

/* Pop-out: the block is a little wider than the body, with even space on both sides, and only
   the head rises above its top edge. */
.portrait-block {
  position: absolute;
  inset: 34% 0 0;
  background: var(--portrait-block);
  border-radius: var(--radius-m);
}

.portrait img {
  position: relative;
  width: 90%;
  margin-inline: auto;
}

/* Wide screens: text on the left, the photo on the right standing on the bottom edge. Tablets keep
   the layout above; side by side only has room from 64rem. */
@media (min-width: 64rem) {
  .hero {
    padding-top: var(--space-2xl);
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
    grid-template-rows: auto;
    gap: var(--space-xl);
    align-items: end;
  }

  .text {
    display: grid;
    gap: var(--space-s);
    justify-items: start;
    padding-bottom: var(--space-2xl);
  }

  .text > *,
  .text > h1 {
    grid-column: auto;
    grid-row: auto;
    margin-top: 0;
  }

  .text > h1 {
    align-self: auto;
    font-size: var(--step-hero);
    text-box: normal;
  }

  .text > h1 span {
    display: inline;
  }

  .actions {
    margin-top: var(--space-2xs);
    margin-bottom: 0;
  }

  .portrait {
    grid-column: 2;
    grid-row: 1;
    width: min(100%, 34rem);
    justify-self: end;
  }

  .portrait-block {
    border-radius: var(--radius-m) var(--radius-m) 0 0;
  }

  /* Mirrored here, so the gaze points left, into the text. On phones the photo is already left of
     the name and looks towards it. */
  .portrait img {
    transform: scaleX(-1);
  }
}
</style>
