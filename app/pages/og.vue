<script setup lang="ts">
import { kaizenFigures } from '~/data/site';

// Not a page for visitors: scripts/export-assets.mjs screenshots this at 1200x630 to make the
// Open Graph images in public/og/ (in light mode). It is never prerendered or listed in the sitemap.
useSeoMeta({ robots: 'noindex, nofollow' });

const route = useRoute();
const { t } = useI18n();
const { number } = useLocalized();
const variant = computed(() => (route.query.variant === 'kaizen' ? 'kaizen' : 'home'));
</script>

<template>
  <div
    class="og"
    :class="variant"
  >
    <div class="text">
      <p
        v-if="variant === 'home'"
        class="name"
      >
        <span>Max</span> <span>Kruiswegt</span>
      </p>
      <p
        v-else
        class="name"
      >
        {{ t('caseStudy.ogTitle') }}
      </p>
      <p class="role">{{ variant === 'home' ? t('hero.role') : t('kaizen.lead') }}</p>
      <p class="proof">
        <img
          src="/images/kaizen/icon.webp"
          width="64"
          height="64"
          alt=""
        />
        <span class="proof-text">
          <span class="proof-title">{{ variant === 'home' ? t('og.maker') : 'Kaizen' }}</span>
          <span>{{ t('og.signups', { signups: number(kaizenFigures.signups) }) }}</span>
        </span>
      </p>
      <p class="domain">maxkruiswegt.com</p>
    </div>

    <div
      v-if="variant === 'home'"
      class="portrait"
    >
      <div class="block" />
      <img
        src="/images/max/max-800.webp"
        width="800"
        height="1105"
        alt=""
      />
    </div>
    <div
      v-else
      class="phones"
    >
      <img
        src="/images/kaizen/timer.webp"
        width="720"
        height="1560"
        alt=""
        class="phone one"
      />
      <img
        src="/images/kaizen/room.webp"
        width="720"
        height="1560"
        alt=""
        class="phone two"
      />
    </div>
  </div>
</template>

<style scoped>
/*
 * 1200x630 on a fixed grid: 80px margins left and right, text left, visual right. Both images are
 * full-colour cards, so they stand out in a light feed: green for the home page, Kaizen's coral
 * for the case study, the same split as on the site. Same type, chip and domain on both.
 */
.og {
  --margin: 80px;
  position: fixed;
  inset: 0;
  z-index: 1000;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 56px;
  padding-inline: var(--margin);
  background: var(--card);
  color: var(--on-accent);
}

.home {
  --card: var(--accent-fill);
}

.kaizen {
  --card: var(--kaizen);
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
}

/* Big, on two lines: the title carries the card. */
.name {
  font-family: var(--font-display);
  font-size: 104px;
  line-height: 0.92;
  letter-spacing: -0.02em;
  text-wrap: balance;
}

.kaizen .name {
  font-size: 92px;
}

.home .name span {
  display: block;
}

.role {
  margin-top: 6px;
  font-family: var(--font-text);
  font-size: 28px;
  line-height: 1.3;
  font-weight: 500;
  max-width: 540px;
  color: color-mix(in srgb, var(--on-accent) 84%, var(--card));
}

.kaizen .role {
  font-size: 26px;
}

/* One concrete fact: Kaizen, with its icon, stacked like an app listing. The corners are
   concentric with the icon's (its ~10px radius plus the 8px padding), so the curves run parallel. */
.proof {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 14px;
  padding: 8px 22px 8px 8px;
  border: 1px solid color-mix(in srgb, currentColor 24%, transparent);
  border-radius: 18px;
  font-family: var(--font-text);
}

.proof img {
  width: 46px;
  height: 46px;
  border-radius: 22.5%;
}

.proof-text {
  display: grid;
  gap: 1px;
  font-size: 18px;
  line-height: 1.2;
  color: color-mix(in srgb, var(--on-accent) 80%, var(--card));
}

.proof-title {
  font-size: 21px;
  font-weight: 600;
  color: var(--on-accent);
}

.domain {
  margin-top: 4px;
  font-family: var(--font-text);
  font-size: 22px;
  font-weight: 600;
  color: color-mix(in srgb, var(--on-accent) 66%, var(--card));
}

/* The hero's pop-out, same proportions: the photo is 90% of the frame's width and the frame
   starts at a third of its height, so the head rises out of it. 460px wide, standing on the
   bottom edge. The frame is a lighter green than the card: lighter reads as closer, which gives
   the layers their depth. */
.portrait {
  position: relative;
  align-self: end;
  width: 460px;
}

.portrait .block {
  position: absolute;
  inset: 34% 0 0;
  background: var(--accent);
  border-radius: 14px 14px 0 0;
}

/* Mirrored like the desktop hero, so the gaze points left, into the name. */
.portrait img {
  position: relative;
  display: block;
  width: 90%;
  height: auto;
  margin-inline: auto;
  transform: scaleX(-1);
}

/* Two 210px phones (455px tall) with a 24px gap, the second 70px lower: 444 x 525, centred. */
.phones {
  position: relative;
  align-self: center;
  width: 444px;
  height: 525px;
}

.phone {
  position: absolute;
  width: 210px;
  border-radius: 9% / 4.2%;
  box-shadow: 0 24px 48px -16px color-mix(in srgb, var(--text) 55%, transparent);
}

.phone.one {
  top: 0;
  left: 0;
}

.phone.two {
  top: 70px;
  right: 0;
}

/* The dev server's devtools button would otherwise end up in the exported image. */
:global(#nuxt-devtools-container) {
  display: none !important;
}
</style>
